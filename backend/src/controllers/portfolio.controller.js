const Project = require('../models/project.model');
const Blog = require('../models/blog.model');
const { sendContactEmail, sendAutoReply } = require('../services/email.service');

// Project Controllers
const getAllProjects = async (req, res) => {
  try {
    const { featured, status = 'active' } = req.query;
    let query = { status };
    
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    const projects = await Project.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
};

const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    
    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project,
      message: 'Project updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
};

// Blog Controllers
const getAllBlogs = async (req, res) => {
  try {
    const { published = true, featured, category, tag } = req.query;
    let query = {};
    
    if (published !== undefined) {
      query.published = published === 'true';
    }
    
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }
    
    if (category) {
      query.category = new RegExp(category, 'i');
    }
    
    if (tag) {
      query.tags = { $in: [new RegExp(tag, 'i')] };
    }

    const blogs = await Blog.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .select('-content'); // Exclude full content for list view
    
    res.json({
      success: true,
      data: blogs,
      count: blogs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views
    await Blog.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
      error: error.message
    });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
      error: error.message
    });
  }
};

const createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    
    res.status(201).json({
      success: true,
      data: blog,
      message: 'Blog post created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating blog post',
      error: error.message
    });
  }
};

// Contact form handler
const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Send email to you
    await sendContactEmail({ name, email, message });
    
    // Send auto-reply to sender
    await sendAutoReply({ name, email, message });
    
    console.log('Contact form submission processed:', { name, email, message });
    
    res.json({
      success: true,
      message: 'Thank you for your message! I have received it and will get back to you soon. You should also receive a confirmation email.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form. Please try again later.',
      error: error.message
    });
  }
};

module.exports = {
  // Project controllers
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  
  // Blog controllers
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  
  // Contact controller
  submitContactForm
};
