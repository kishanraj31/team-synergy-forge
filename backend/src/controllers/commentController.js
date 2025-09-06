const { validationResult } = require('express-validator');
const Comment = require('../models/Comment');
const Project = require('../models/Project');

const createComment = async (req, res) => {
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
    const { content, parentComment } = req.body;
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

    // If parentComment is provided, verify it exists and belongs to the same project
    if (parentComment) {
      const parent = await Comment.findOne({
        _id: parentComment,
        project: projectId
      });

      if (!parent) {
        return res.status(400).json({
          success: false,
          message: 'Parent comment not found or does not belong to this project'
        });
      }
    }

    const comment = new Comment({
      project: projectId,
      user: userId,
      content,
      parentComment
    });

    await comment.save();
    await comment.populate('user', 'username email');
    await comment.populate('parentComment');

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: { comment }
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getProjectComments = async (req, res) => {
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

    const comments = await Comment.find({ project: projectId })
      .populate('user', 'username email')
      .populate('parentComment')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { comments }
    });
  } catch (error) {
    console.error('Get project comments error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getRecentComments = async (req, res) => {
  try {
    const userId = req.user._id;
    const limit = parseInt(req.query.limit) || 10;

    // Get all projects user is a member of
    const projects = await Project.find({ members: userId }).select('_id');
    const projectIds = projects.map(p => p._id);

    const comments = await Comment.find({ project: { $in: projectIds } })
      .populate('user', 'username email')
      .populate('project', 'name')
      .populate('parentComment')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({
      success: true,
      data: { comments }
    });
  } catch (error) {
    console.error('Get recent comments error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(id)
      .populate('user', 'username email')
      .populate('project', 'name')
      .populate('parentComment');

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if user is a member of the project
    const project = await Project.findOne({
      _id: comment.project._id,
      members: userId
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: { comment }
    });
  } catch (error) {
    console.error('Get comment by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const updateComment = async (req, res) => {
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
    const { content } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if user is the author of the comment
    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own comments'
      });
    }

    comment.content = content;
    await comment.save();
    await comment.populate('user', 'username email');
    await comment.populate('project', 'name');
    await comment.populate('parentComment');

    res.json({
      success: true,
      message: 'Comment updated successfully',
      data: { comment }
    });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if user is the author of the comment
    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own comments'
      });
    }

    await Comment.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  createComment,
  getProjectComments,
  getRecentComments,
  getCommentById,
  updateComment,
  deleteComment
};