const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const Project = require('../models/Project');

const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id: projectId } = req.params;
    const { title, description, assignee, dueDate } = req.body;
    const userId = req.user._id;

    // Check if user is a member of the project
    const project = await Project.findOne({
      _id: projectId,
      members: userId
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or access denied'
      });
    }

    // If assignee is provided, verify they are a project member
    if (assignee) {
      const isMember = project.members.includes(assignee);
      if (!isMember) {
        return res.status(400).json({
          success: false,
          message: 'Assignee must be a member of the project'
        });
      }
    }

    const task = new Task({
      project: projectId,
      title,
      description,
      assignee,
      dueDate: dueDate ? new Date(dueDate) : undefined
    });

    await task.save();
    await task.populate('assignee', 'username email');
    await task.populate('project', 'name');

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: { task }
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getProjectTasks = async (req, res) => {
  try {
    const { id: projectId } = req.params;
    const userId = req.user._id;

    // Check if user is a member of the project
    const project = await Project.findOne({
      _id: projectId,
      members: userId
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or access denied'
      });
    }

    const tasks = await Task.find({ project: projectId })
      .populate('assignee', 'username email')
      .populate('project', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { tasks }
    });
  } catch (error) {
    console.error('Get project tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { title, description, assignee, dueDate, status } = req.body;
    const userId = req.user._id;

    const task = await Task.findById(id).populate('project');
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if user is a member of the project
    const project = await Project.findOne({
      _id: task.project._id,
      members: userId
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Access denied'
      });
    }

    // If assignee is being changed, verify they are a project member
    if (assignee && assignee !== task.assignee?.toString()) {
      const isMember = project.members.includes(assignee);
      if (!isMember) {
        return res.status(400).json({
          success: false,
          message: 'Assignee must be a member of the project'
        });
      }
    }

    // Update task
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (assignee !== undefined) task.assignee = assignee;
    if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : null;
    if (status !== undefined) task.status = status;

    await task.save();
    await task.populate('assignee', 'username email');
    await task.populate('project', 'name');

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: { task }
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const task = await Task.findById(id).populate('project');
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if user is a member of the project
    const project = await Project.findOne({
      _id: task.project._id,
      members: userId
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Access denied'
      });
    }

    await Task.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getMyTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await Task.find({ assignee: userId })
      .populate('assignee', 'username email')
      .populate('project', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { tasks }
    });
  } catch (error) {
    console.error('Get my tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask,
  getMyTasks
};