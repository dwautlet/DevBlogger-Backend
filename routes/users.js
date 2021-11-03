var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

/* GET All users that exist on application */
router.route('/').get(usersController.getUsers);

/* POST a new user to the collection of users, add them to Cognito */
router.route('/add').post(usersController.addUser);

module.exports = router;
