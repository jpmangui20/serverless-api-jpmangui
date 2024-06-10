// models/blogPost.js
const mongoose = require('mongoose');
const blogPostSchema = require('../schema/blogPost');

const BlogPostModel = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPostModel;
