const express = require('express');
let router = express.Router();
const User = require('../controllers/user');
const { checkLoggedIn, checkToken } = require('../middleware/auth');

router
  .route('/profile')
  .post(User.postUser)
  .get(User.fetchAllUsers)
  .patch(User.updateUser);

router.route('/profile/:id').get(User.fetchUserById).delete(User.deleteUser);

router.route('/signin').post(User.signIn);

router.route('/isAuth').get(checkLoggedIn, User.isAuth);

router.route('/verify/:token').get(User.verifyToken);

module.exports = router;
