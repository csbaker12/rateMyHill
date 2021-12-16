import * as users from './index';
import axios from 'axios';
import {
  getAuthHeaders,
  getTokenCookie,
  removeTokenCookie,
} from '../../components/utils/tools';
// const jwt = require('jsonwebtoken');
require('dotenv').config();

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const logInUser = (userData) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(`/user/signin`, userData);
      dispatch(users.authUser({ data: user.data, auth: true }));
      dispatch(users.successGlobal('Successfully logged in'));
    } catch (error) {
      dispatch(users.errorGlobal('Error logging in user'));
    }
  };
};

export const createAccount = (userData) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(`/user/profile`, userData);
      console.log(user.data);
      dispatch(users.createAccount(user.data));
      dispatch(users.successGlobal('Check email to verify your account!'));
    } catch (error) {
      dispatch(users.errorGlobal('Error creating user'));
    }
  };
};

export const isAuthUser = () => {
  return async (dispatch) => {
    try {
      if (!getTokenCookie()) {
        throw new Error();
      }
      const user = await axios.get(`/user/isauth`, getAuthHeaders());
      dispatch(users.authUser({ data: user.data, auth: true }));
    } catch (error) {
      dispatch(users.authUser({ data: {}, auth: false }));
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    removeTokenCookie();
    dispatch(users.signOut());
    dispatch(users.successGlobal('Logged out'));
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const userList = await axios.get(`/user/profile`);
      dispatch(users.getAllUsers(userList.data));
      dispatch(users.successGlobal('Users fetched'));
    } catch (error) {
      dispatch(users.errorGlobal('Cannot fetch users'));
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const userData = await axios.delete(`/user/profile/${id}`);
      dispatch(users.deleteUser(userData.data));
      dispatch(users.successGlobal('User Deleted'));
    } catch (error) {
      dispatch(users.errorGlobal('Cannot delete user'));
    }
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const userData = await axios.get(`/user/profile/${id}`);
      dispatch(users.getUserById(userData.data));
      dispatch(users.successGlobal('User info fetched'));
    } catch (error) {
      dispatch(users.errorGlobal('Cannot find user'));
    }
  };
};

export const accountVerify = (token) => {
  return async (dispatch) => {
    try {
      await axios.get(`/user/verify/${token.token}`);

      dispatch(users.accountVerify());
      dispatch(users.successGlobal('Account Verified!'));
    } catch (error) {
      dispatch(users.errorGlobal('Error verifying account'));
    }
  };
};

export const updateUser = (userData) => {
  return async (dispatch) => {
    try {
      const user = await axios.patch(`/user/profile`, userData);
      dispatch(users.updateUser(user.data));
      dispatch(users.successGlobal('User Updated!'));
    } catch (error) {
      dispatch(users.errorGlobal('Error updating user'));
    }
  };
};
