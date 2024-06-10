// schema/blogPost.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    user: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const blogPostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: [String],
    comments: [commentSchema],
    date: { type: Date, default: Date.now }
});

module.exports = blogPostSchema;
