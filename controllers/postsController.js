var express = require('express');
var router = express.Router();
const Post = require('../models/postModel');

/* GET all the available posts. */
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        console.log(posts);

        res.status(200).json({
            status: "success",
            data: {
                posts
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
        console.log(error);
    }
}

/* POST a new article to the DB.*/
exports.addPost = async (req, res) => {
    try {
        var newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            fullText: req.body.fullText,
            category: req.body.category,
            comments: []
        });

        newPost.save(async (err, newOne) => {
            if (err) { 
                //console.log(err); 
                res.status(404).json({
                    status: 'fail',
                    message: err
                });
            } else {
                res.status(200).json({
                    status: "success",
                    data: {
                        response: "Added a new one!"
                    }
                });
            };
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
};