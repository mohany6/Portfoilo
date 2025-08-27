const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  submitContactForm
} = require('../controllers/portfolio.controller');

// Project routes
router.get('/projects', getAllProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Blog routes
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);
router.get('/blog/slug/:slug', getBlogBySlug);
router.post('/blogs', createBlog);

// Contact route
router.post('/contact', submitContactForm);

module.exports = router;
