const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  checkToken: async (req, res, next) => {
    try {
      if (req.headers['x-access-token']) {
        console.log('token coming');
        // verify token
        const accessToken = req.headers['x-access-token'];
        console.log(accessToken);
        const { _id, email, exp } = jwt.verify(
          accessToken,
          process.env.DB_SECRET
        );
        console.log(_id);

        res.locals.userData = await User.findById(_id);
        next();
      } else {
        next();
      }
    } catch (error) {
      return res.status(401).json({ error: 'Bad token', errors: error });
    }
  },
  checkLoggedIn: (req, res, next) => {
    const user = res.locals.userData;
    if (!req.headers.cookie)
      return res.status(401).json({ error: 'Please Log In' });

    req.user = user;

    next();
  },
};
