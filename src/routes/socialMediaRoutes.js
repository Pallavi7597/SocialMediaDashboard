// socialMediaRoutes.js

const express = require('express');
const router = express.Router();
const socialMediaController = require('../controllers/socialMediaController');

// Define routes for social media operations

// Get all posts
router.get('/posts', socialMediaController.getAllPosts);

// Get post by ID
router.get('/posts/:id', socialMediaController.getPostById);

// Create a new post
router.post('/posts', socialMediaController.createPost);

// Update a post by ID
router.put('/posts/:id', socialMediaController.updatePostById);

// Delete a post by ID
router.delete('/posts/:id', socialMediaController.deletePostById);

module.exports = router;
