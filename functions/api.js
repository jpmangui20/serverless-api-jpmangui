const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/blogPost');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// MongoDB URL
const dbCloudUrl = 'mongodb+srv://jacoblaugo32:sarapmobenefer@cluster0.qwktp3q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbLocalUrl = 'mongodb://localhost:27017/blogPosts';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(dbCloudUrl || dbLocalUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB', error));

app.use('/.netlify/functions/api/blogPosts', router);
module.exports.handler = serverless(app);
