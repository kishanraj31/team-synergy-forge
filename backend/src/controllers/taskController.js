const { pool } = require('../config/database');

// Create new task
const createTask = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { title, description, assigned_to_user_id, due_date, status } = req.body;

    // Verify project exists and user is a member
    const [projects] = await pool.execute(
      'SELECT id FROM Projects WHERE id = ?',
      [projectId]
    );

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // If assigned_to_user_id is provided, verify user is a project member
    if (assigned_to_user_id) {
      const [members] = await pool.execute(
        'SELECT * FROM ProjectMembers WHERE project_id = ? AND user_id = ?',
        [projectId, assigned_to_user_id]
      );

      if (members.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Assigned user is not a member of this project'
        });
      }
    }

    // Create task
    const [result] = await pool.execute(
      'INSERT INTO Tasks (project_id, title, description, assigned_to_user_id, due_date, status) VALUES (?, ?, ?, ?, ?, ?)',
      [projectId, title, description, assigned_to_user_id || null, due_date || null, status || 'To-Do']
    );

    const taskId = result.insertId;

    // Get created task with assignee info
    const [tasks] = await pool.execute(`
      SELECT t.*, u.username as assigned_to_username, u.email as assigned_to_email
      FROM Tasks t
      LEFT JOIN Users u ON t.assigned_to_user_id = u.id
      WHERE t.id = ?
    `, [taskId]);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: {
        task: tasks[0]
      }
    });

    console.log(`New task created: ${title} in project ${projectId}`);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating task'
    });
  }
};

// Get all tasks for a project
const getProjectTasks = async (req, res) => {
  try {
    const projectId = req.params.id;

    const [tasks] = await pool.execute(`
      SELECT t.*, u.username as assigned_to_username, u.email as assigned_to_email
      FROM Tasks t
      LEFT JOIN Users u ON t.assigned_to_user_id = u.id
      WHERE t.project_id = ?
      ORDER BY t.created_at DESC
    `, [projectId]);

    res.json({
      success: true,
      data: {
        tasks
      }
    });
  } catch (error) {
    console.error('Get project tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting tasks'
    });
  }
};

// Get single task
const getTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const [tasks] = await pool.execute(`
      SELECT t.*, u.username as assigned_to_username, u.email as assigned_to_email
      FROM Tasks t
      LEFT JOIN Users u ON t.assigned_to_user_id = u.id
      WHERE t.id = ?
    `, [taskId]);

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      data: {
        task: tasks[0]
      }
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting task'
    });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, assigned_to_user_id, due_date, status } = req.body;

    // Get current task to verify it exists and get project_id
    const [currentTasks] = await pool.execute(
      'SELECT project_id FROM Tasks WHERE id = ?',
      [taskId]
    );

    if (currentTasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const projectId = currentTasks[0].project_id;

    // If assigned_to_user_id is provided, verify user is a project member
    if (assigned_to_user_id) {
      const [members] = await pool.execute(
        'SELECT * FROM ProjectMembers WHERE project_id = ? AND user_id = ?',
        [projectId, assigned_to_user_id]
      );

      if (members.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Assigned user is not a member of this project'
        });
      }
    }

    // Update task
    await pool.execute(
      'UPDATE Tasks SET title = COALESCE(?, title), description = COALESCE(?, description), assigned_to_user_id = ?, due_date = ?, status = COALESCE(?, status) WHERE id = ?',
      [title, description, assigned_to_user_id || null, due_date || null, status, taskId]
    );

    // Get updated task
    const [tasks] = await pool.execute(`
      SELECT t.*, u.username as assigned_to_username, u.email as assigned_to_email
      FROM Tasks t
      LEFT JOIN Users u ON t.assigned_to_user_id = u.id
      WHERE t.id = ?
    `, [taskId]);

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: {
        task: tasks[0]
      }
    });

    console.log(`Task ${taskId} updated by user ${req.user.username}`);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating task'
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Check if task exists
    const [tasks] = await pool.execute(
      'SELECT id FROM Tasks WHERE id = ?',
      [taskId]
    );

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await pool.execute('DELETE FROM Tasks WHERE id = ?', [taskId]);

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });

    console.log(`Task ${taskId} deleted by user ${req.user.username}`);
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting task'
    });
  }
};

// Get tasks assigned to current user
const getMyTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const [tasks] = await pool.execute(`
      SELECT t.*, p.name as project_name, u.username as assigned_to_username, u.email as assigned_to_email
      FROM Tasks t
      JOIN Projects p ON t.project_id = p.id
      LEFT JOIN Users u ON t.assigned_to_user_id = u.id
      WHERE t.assigned_to_user_id = ?
      ORDER BY t.created_at DESC
    `, [userId]);

    res.json({
      success: true,
      data: {
        tasks
      }
    });
  } catch (error) {
    console.error('Get my tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting tasks'
    });
  }
};

// Get tasks by status
const getTasksByStatus = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { status } = req.query;

    if (!status || !['To-Do', 'In Progress', 'Done'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status is required (To-Do, In Progress, Done)'
      });
    }

    const [tasks] = await pool.execute(`
      SELECT t.*, u.username as assigned_to_username, u.email as assigned_to_email
      FROM Tasks t
      LEFT JOIN Users u ON t.assigned_to_user_id = u.id
      WHERE t.project_id = ? AND t.status = ?
      ORDER BY t.created_at DESC
    `, [projectId, status]);

    res.json({
      success: true,
      data: {
        tasks
      }
    });
  } catch (error) {
    console.error('Get tasks by status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting tasks'
    });
  }
};

module.exports = {
  createTask,
  getProjectTasks,
  getTask,
  updateTask,
  deleteTask,
  getMyTasks,
  getTasksByStatus
};
