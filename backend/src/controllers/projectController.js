const { pool } = require('../config/database');

// Create new project
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const createdByUserId = req.user.id;

    // Create project
    const [result] = await pool.execute(
      'INSERT INTO Projects (name, description, created_by_user_id) VALUES (?, ?, ?)',
      [name, description, createdByUserId]
    );

    const projectId = result.insertId;

    // Add creator as project member
    await pool.execute(
      'INSERT INTO ProjectMembers (user_id, project_id) VALUES (?, ?)',
      [createdByUserId, projectId]
    );

    // Get created project with creator info
    const [projects] = await pool.execute(`
      SELECT p.*, u.username as created_by_username, u.email as created_by_email
      FROM Projects p
      LEFT JOIN Users u ON p.created_by_user_id = u.id
      WHERE p.id = ?
    `, [projectId]);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: {
        project: projects[0]
      }
    });

    console.log(`New project created: ${name} by user ${req.user.username}`);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating project'
    });
  }
};

// Get all projects for authenticated user
const getProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const [projects] = await pool.execute(`
      SELECT DISTINCT p.*, u.username as created_by_username, u.email as created_by_email
      FROM Projects p
      LEFT JOIN Users u ON p.created_by_user_id = u.id
      LEFT JOIN ProjectMembers pm ON p.id = pm.project_id
      WHERE pm.user_id = ?
      ORDER BY p.created_at DESC
    `, [userId]);

    res.json({
      success: true,
      data: {
        projects
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting projects'
    });
  }
};

// Get single project with details
const getProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.id;

    // Get project details
    const [projects] = await pool.execute(`
      SELECT p.*, u.username as created_by_username, u.email as created_by_email
      FROM Projects p
      LEFT JOIN Users u ON p.created_by_user_id = u.id
      WHERE p.id = ?
    `, [projectId]);

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const project = projects[0];

    // Get project members
    const [members] = await pool.execute(`
      SELECT u.id, u.username, u.email, pm.joined_at
      FROM ProjectMembers pm
      JOIN Users u ON pm.user_id = u.id
      WHERE pm.project_id = ?
      ORDER BY pm.joined_at ASC
    `, [projectId]);

    // Get project tasks
    const [tasks] = await pool.execute(`
      SELECT t.*, u.username as assigned_to_username, u.email as assigned_to_email
      FROM Tasks t
      LEFT JOIN Users u ON t.assigned_to_user_id = u.id
      WHERE t.project_id = ?
      ORDER BY t.created_at DESC
    `, [projectId]);

    // Get recent comments (last 10)
    const [comments] = await pool.execute(`
      SELECT c.*, u.username, u.email
      FROM Comments c
      JOIN Users u ON c.user_id = u.id
      WHERE c.project_id = ?
      ORDER BY c.created_at DESC
      LIMIT 10
    `, [projectId]);

    res.json({
      success: true,
      data: {
        project: {
          ...project,
          members,
          tasks,
          comments
        }
      }
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting project'
    });
  }
};

// Add member to project
const addMember = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { user_id } = req.body;

    // Check if user exists
    const [users] = await pool.execute(
      'SELECT id, username, email FROM Users WHERE id = ?',
      [user_id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is already a member
    const [existingMembers] = await pool.execute(
      'SELECT * FROM ProjectMembers WHERE project_id = ? AND user_id = ?',
      [projectId, user_id]
    );

    if (existingMembers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'User is already a member of this project'
      });
    }

    // Add user as project member
    await pool.execute(
      'INSERT INTO ProjectMembers (user_id, project_id) VALUES (?, ?)',
      [user_id, projectId]
    );

    res.status(201).json({
      success: true,
      message: 'Member added to project successfully',
      data: {
        member: users[0]
      }
    });

    console.log(`User ${users[0].username} added to project ${projectId}`);
  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding member'
    });
  }
};

// Remove member from project
const removeMember = async (req, res) => {
  try {
    const projectId = req.params.id;
    const memberId = req.params.memberId;

    // Check if member exists
    const [members] = await pool.execute(
      'SELECT * FROM ProjectMembers WHERE project_id = ? AND user_id = ?',
      [projectId, memberId]
    );

    if (members.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Member not found in this project'
      });
    }

    // Remove member
    await pool.execute(
      'DELETE FROM ProjectMembers WHERE project_id = ? AND user_id = ?',
      [projectId, memberId]
    );

    res.json({
      success: true,
      message: 'Member removed from project successfully'
    });

    console.log(`User ${memberId} removed from project ${projectId}`);
  } catch (error) {
    console.error('Remove member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error removing member'
    });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { name, description } = req.body;

    await pool.execute(
      'UPDATE Projects SET name = ?, description = ? WHERE id = ?',
      [name, description, projectId]
    );

    res.json({
      success: true,
      message: 'Project updated successfully'
    });

    console.log(`Project ${projectId} updated by user ${req.user.username}`);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating project'
    });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    await pool.execute('DELETE FROM Projects WHERE id = ?', [projectId]);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });

    console.log(`Project ${projectId} deleted by user ${req.user.username}`);
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting project'
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  addMember,
  removeMember,
  updateProject,
  deleteProject
};
