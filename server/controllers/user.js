const User = require('../models/user');

const getUserProps = (user) => {
  return {
    _id: user._id,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    verified: user.verified,
  };
};

exports.postUser = async (req, res) => {
  try {
    let data = req.body;

    const user = await User.create(data);
    if (user.success) {
      return res
        .cookie('x-access-token', user.token)
        .status(200)
        .json({ user: user.user });
    } else {
      return res.status(400).json({
        message: 'User creation failed',
      });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error });
  }
};

exports.fetchUserById = async (req, res) => {
  try {
    let data = req.params.id;
    const user = await User.findById(data);

    if (user.success) {
      res.status(200).json({ user: user.user });
    } else {
      res.status(400).json({ message: 'Error finding user', error: error });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user', error: error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let data = req.body;
    const user = await User.update(data);
    if (user.success) {
      return res.status(200).json({ user: user.user });
    } else {
      return res.status(400).json({
        message: 'User updating failed',
      });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error });
  }
};

exports.fetchAllUsers = async (req, res) => {
  try {
    let users = await User.findAllUsers();

    if (users.success) {
      res.status(200).json({ users: users.users });
    } else {
      res.status(400).json({ message: 'Error finding users', error: error });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error fetching users', error: error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let data = req.params.id;
    let user = await User.delete(data);
    if (user.success) {
      res.status(200).json({ user: user.user });
    } else {
      res.status(400).json({ message: 'Error deleting user', error: error });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete user', error: error });
  }
};

exports.signIn = async (req, res) => {
  try {
    // FIND USER
    let data = req.body;
    let user = await User.signIn(data);
    console.log(user);
    if (user.success) {
      return res
        .cookie('x-access-token', user.token)
        .status(200)
        .json({ user: user.user });
    } else {
      return res.status(400).json({
        message: 'User sign in failed',
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to sign in the user', error: error });
  }
};

exports.isAuth = async (req, res) => {
  try {
    res.status(200).send(getUserProps(req.user));
  } catch (error) {
    res.status(400).json({ message: 'failed to auth user', error: error });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    let token = req.params.token;
    let verified = await User.verifyToken(token);
    if (verified.success) {
      return res.status(200).json({ message: 'User Verified' });
    }
  } catch (error) {
    res.status(400).json({ message: 'failed to verify user', error: error });
  }
};
