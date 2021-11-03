var express = require('express');
var router = express.Router();
const Post = require('./../models/postModel');
const User = require('./../models/userModel');
var fs = require('fs');

/* POST a new user to the collection of users */
exports.addUser = async (req, res) => {
    try {
        var newUser = new User({
            name: req.body.name,
            email: req.body.email
        });

        newUser.save(async (err, newOne) => {
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

/* GET a user's info after they have already been logged in. */
exports.getUsers = async (req, res) => {
    try {
            // Find the couresponding user in MongoDB
            const users = await User.find();

            console.log(users);
    
            res.status(200).json({
                status: "success",
                data: {
                    users
                }
            });

    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
}