var express = require('express');
var router = express.Router();
const postsController = require('../controllers/postsController');

/* GET all available blog posts. */
router.route('/').get(postsController.getAllPosts);

/* POST a new piece of merchandise for sale. */
router.route('/add').post(postsController.addPost);

module.exports = router;