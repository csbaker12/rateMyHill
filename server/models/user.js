const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
require('dotenv').config();
const { registerEmail } = require('../config/email');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email Address');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superAdmin'],
    default: 'user',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = {
  User,
  create: async (data) => {
    let success = false;

    try {
      //check if email taken
      let email = await User.findOne({ email: data.email });
      if (email) {
        console.log('email taken');
        return { success: false };
      }
      //salt pass
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(data.password, salt);
      data.password = hash;
      //create user
      let user = new User({
        username: data.username,
        password: data.password,
        email: data.email,
      });

      const doc = await user.save();
      if (doc) {
        success = true;
      }
      //generate token

      const userObj = {
        email: data.email,
        id: user._id.toHexString(),
      };
      const token = jwt.sign(userObj, process.env.DB_SECRET, {
        expiresIn: '10d',
      });
      //send email

      const emailObj = {
        id: user._id.toHexString(),
      };
      const emailToken = jwt.sign(emailObj, process.env.DB_SECRET, {
        expiresIn: '100d',
      });

      await registerEmail(data.email, emailToken);

      return {
        user,
        success,
        token,
        // emailToken,
      };
    } catch (error) {
      console.log('error creating user');
      return { success: false };
    }
  },
  verifyToken: async (token) => {
    let success = false;
    try {
      console.log(token);
      const tokenData = jwt.verify(token, process.env.DB_SECRET);
      console.log(tokenData.id);
      const user = await User.findOneAndUpdate(
        { _id: tokenData.id },
        {
          $set: {
            verified: true,
          },
        },
        { new: true }
      );
      if (user) {
        success = true;
      }

      return { user, success };
    } catch (error) {
      console.log('error validating the user');
      return { success: false };
    }
  },
  findById: async (id) => {
    let success = false;
    try {
      const user = await User.findById(id);
      if (user) {
        success = true;
      }
      return { user, success };
    } catch (error) {
      console.log('error fetching user');
      return { success: false };
    }
  },
  update: async (data) => {
    let success = false;
    try {
      const user = await User.findOneAndUpdate(
        { _id: data.id },
        {
          $set: {
            username: data.username,
            email: data.email,
            password: data.password,
          },
        },
        { new: true }
      );
      if (user) {
        success = true;
      }
      return {
        user,
        success,
      };
    } catch (error) {
      console.log('error updating user');
      return { success: false };
    }
  },
  findAllUsers: async () => {
    let success = false;
    try {
      const users = await User.find();
      if (users) {
        success = true;
      }
      return { users, success };
    } catch (error) {
      console.log('error fetching users');
      return { success: false };
    }
  },
  delete: async (id) => {
    let success = false;
    try {
      const user = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            isActive: false,
          },
        },
        { new: true }
      );
      if (user) {
        success = true;
      }
      return { user, success };
    } catch (error) {
      console.log('error deleting user');
      return { success: false };
    }
  },
  signIn: async (data) => {
    let success = false;
    try {
      let user = await User.findOne({ email: data.email });
      if (!user) {
        console.log('bad email');
        return { success: false };
      }
      const match = await bcrypt.compare(data.password, user.password);
      if (!match) {
        console.log('bad password');
        return { success: false };
      }
      const userObj = {
        email: user.email,
        _id: user._id.toHexString(),
      };
      const token = jwt.sign(userObj, process.env.DB_SECRET, {
        expiresIn: '10d',
      });

      success = true;

      return {
        user,
        success,
        token,
      };
    } catch (error) {
      console.log('error signin in user');
      return { success: false };
    }
  },
};
