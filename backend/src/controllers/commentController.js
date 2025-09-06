const { pool } = require('../config/database');

// Create new comment
const createComment = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { content, parent_comment_id } = req.body;
    const userId = req.user.id;

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

    // If parent_comment_id is provided, verify it exists and belongs to the same project
    if (parent_comment_id) {
      const [parentComments] = await pool.execute(
        'SELECT id FROM Comments WHERE id = ? AND project_id = ?',
        [parent_comment_id, projectId]
      );

      if (parentComments.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Parent comment not found or does not belong to this project'
        });
      }
    }

    // Create comment
    const [result] = await pool.execute(
      'INSERT INTO Comments (project_id, user_id, content, parent_comment_id) VALUES (?, ?, ?, ?)',
      [projectId, userId, content, parent_comment_id || null]
    );

    const commentId = result.insertId;

    // Get created comment with user info
    const [comments] = await pool.execute(`
      SELECT c.*, u.username, u.email
      FROM Comments c
      JOIN Users u ON c.user_id = u.id
      WHERE c.id = ?
    `, [commentId]);

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: {
        comment: comments[0]
      }
    });

    console.log(`New comment created in project ${projectId} by user ${req.user.username}`);
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating comment'
    });
  }
};

// Get all comments for a project
const getProjectComments = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { page = 1, limit = 20 } = req.query;

    const offset = (page - 1) * limit;

    // Get total count
    const [countResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM Comments WHERE project_id = ?',
      [projectId]
    );

    const total = countResult[0].total;

    // Get comments with user info, ordered by creation time
    const [comments] = await pool.execute(`
      SELECT c.*, u.username, u.email
      FROM Comments c
      JOIN Users u ON c.user_id = u.id
      WHERE c.project_id = ?
      ORDER BY c.created_at DESC
      LIMIT ? OFFSET ?
    `, [projectId, parseInt(limit), offset]);

    // Build threaded structure
    const commentMap = new Map();
    const rootComments = [];

    // First pass: create comment objects
    comments.forEach(comment => {
      commentMap.set(comment.id, {
        ...comment,
        replies: []
      });
    });

    // Second pass: build hierarchy
    comments.forEach(comment => {
      if (comment.parent_comment_id) {
        const parent = commentMap.get(comment.parent_comment_id);
        if (parent) {
          parent.replies.push(commentMap.get(comment.id));
        }
      } else {
        rootComments.push(commentMap.get(comment.id));
      }
    });

    res.json({
      success: true,
      data: {
        comments: rootComments,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get project comments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting comments'
    });
  }
};

// Get single comment
const getComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    const [comments] = await pool.execute(`
      SELECT c.*, u.username, u.email
      FROM Comments c
      JOIN Users u ON c.user_id = u.id
      WHERE c.id = ?
    `, [commentId]);

    if (comments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    res.json({
      success: true,
      data: {
        comment: comments[0]
      }
    });
  } catch (error) {
    console.error('Get comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting comment'
    });
  }
};

// Update comment
const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { content } = req.body;
    const userId = req.user.id;

    // Check if comment exists and belongs to user
    const [comments] = await pool.execute(
      'SELECT id FROM Comments WHERE id = ? AND user_id = ?',
      [commentId, userId]
    );

    if (comments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found or you do not have permission to edit it'
      });
    }

    // Update comment
    await pool.execute(
      'UPDATE Comments SET content = ? WHERE id = ?',
      [content, commentId]
    );

    // Get updated comment
    const [updatedComments] = await pool.execute(`
      SELECT c.*, u.username, u.email
      FROM Comments c
      JOIN Users u ON c.user_id = u.id
      WHERE c.id = ?
    `, [commentId]);

    res.json({
      success: true,
      message: 'Comment updated successfully',
      data: {
        comment: updatedComments[0]
      }
    });

    console.log(`Comment ${commentId} updated by user ${req.user.username}`);
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating comment'
    });
  }
};

// Delete comment
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;

    // Check if comment exists and belongs to user
    const [comments] = await pool.execute(
      'SELECT id FROM Comments WHERE id = ? AND user_id = ?',
      [commentId, userId]
    );

    if (comments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found or you do not have permission to delete it'
      });
    }

    // Delete comment (this will also delete all replies due to CASCADE)
    await pool.execute('DELETE FROM Comments WHERE id = ?', [commentId]);

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });

    console.log(`Comment ${commentId} deleted by user ${req.user.username}`);
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting comment'
    });
  }
};

// Get recent comments across all projects for user
const getRecentComments = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 10 } = req.query;

    const [comments] = await pool.execute(`
      SELECT c.*, u.username, u.email, p.name as project_name
      FROM Comments c
      JOIN Users u ON c.user_id = u.id
      JOIN Projects p ON c.project_id = p.id
      JOIN ProjectMembers pm ON p.id = pm.project_id
      WHERE pm.user_id = ?
      ORDER BY c.created_at DESC
      LIMIT ?
    `, [userId, parseInt(limit)]);

    res.json({
      success: true,
      data: {
        comments
      }
    });
  } catch (error) {
    console.error('Get recent comments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting recent comments'
    });
  }
};

module.exports = {
  createComment,
  getProjectComments,
  getComment,
  updateComment,
  deleteComment,
  getRecentComments
};
