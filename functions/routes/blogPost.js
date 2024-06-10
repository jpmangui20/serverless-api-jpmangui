// routes/blogPost.js
const express = require('express');
const BlogPostModel = require('../models/blogPost');

const router = express.Router();

// GET all blog posts or search by category/tags
router.get('/', async (req, res) => {
    try {
        const { category, tag } = req.query;
        let filter = {};
        if (category) filter.category = category;
        if (tag) filter.tags = { $in: [tag] };
        const posts = await BlogPostModel.find(filter);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single blog post by ID
router.get('/:id', getBlogPost, (req, res) => {
    res.json(res.blogPost);
});

// Create a new blog post
router.post('/', async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        if (!title || !content || !category) {
            return res.status(400).json({ message: 'Title, content, and category are required' });
        }

        const newPost = new BlogPostModel({ title, content, category, tags });
        const savedPost = await newPost.save();
        res.status(201).json({ message: 'Blog post created successfully', post: savedPost });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/:id/comments', async (req, res) => {
    try {
        const { user, content } = req.body;
        if (!user || !content) {
            return res.status(400).json({ message: 'User and content are required' });
        }

        const blogPost = await BlogPostModel.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        blogPost.comments.push({ user, content });
        await blogPost.save();
        res.status(201).json(blogPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an existing blog post
router.put('/:id', getBlogPost, async (req, res) => {
    try {
        const updatedPost = await BlogPostModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a blog post
router.delete('/:id', getBlogPost, async (req, res) => {
    try {
        await res.blogPost.deleteOne();
        res.json({ message: 'Blog post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a single blog post by ID
async function getBlogPost(req, res, next) {
    try {
        const blogPost = await BlogPostModel.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.blogPost = blogPost;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = router;
