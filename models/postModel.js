const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post must contain a name!']
    },
    description: {
      type: String,
      required: [true, 'Post must contain a price!']
    },
    fullText: {
      type: String,
      required: [true, 'Post must contain a description!']
    },
    category: {
      type: String,
      required: [true, 'Post must contain a user id!']
    },
    comments: [{name: String, comment: String}],
  }
);

const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;