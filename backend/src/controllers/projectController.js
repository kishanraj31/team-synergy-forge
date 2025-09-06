const { validationResult } = require('express-validator');
const Project = require('../models/Project');
const User = require('../models/User');

const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, description } = req.body;
    const createdBy = req.user._id;

    const project = new Project({
      name,
      description,
      createdBy,
      members: [createdBy] // Creator is automatically a member
    });

    await project.save();
    await project.populate('createdBy', 'username email');
    await project.populate('members', 'username email');

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: { project }
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const projects = await Project.find({
      members: userId
    })
    .populate('createdBy', 'username email')
    .populate('members', 'username email')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { projects }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const project = await Project.findOne({
      _id: id,
      members: userId
    })
    .populate('createdBy', 'username email')
    .populate('members', 'username email');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or access denied'
      });
    }

    // Get project tasks
    const Task = require('../models/Task');
    const tasks = await Task.find({ project: id })
      .populate('assignee', 'username email')
      .sort({ createdAt: -1 });

    // Get project comments
    const Comment = require('../models/Comment');
    const comments = await Comment.find({ project: id })
      .populate('user', 'username email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        project,
        tasks,
        comments
      }
    });
  } catch (error) {
    console.error('Get project by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const addMember = async (req, res) => {
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
    const { email } = req.body;
    const userId = req.user._id;

    // Check if user is project creator
    const project = await Project.findOne({
      _id: id,
      createdBy: userId
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or you are not the creator'
      });
    }

    // Find user by email
    const userToAdd = await User.findOne({ email });
    if (!userToAdd) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is already a member
    if (project.members.includes(userToAdd._id)) {
      return res.status(400).json({
        success: false,
        message: 'User is already a member of this project'
      });
    }

    // Add user to project
    project.members.push(userToAdd._id);
    await project.save();

    await project.populate('createdBy', 'username email');
    await project.populate('members', 'username email');

    res.json({
      success: true,
      message: 'Member added successfully',
      data: { project }
    });
  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Check if user is project creator
    const project = await Project.findOne({
      _id: id,
      createdBy: userId
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or you are not the creator'
      });
    }

    // Delete related tasks and comments
    const Task = require('../models/Task');
    const Comment = require('../models/Comment');
    
    await Task.deleteMany({ project: id });
    await Comment.deleteMany({ project: id });
    
    // Delete the project
    await Project.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  addMember,
  deleteProject
};