import {
  GET_RESORTS,
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  GET_RESORT_BY_ID,
  CLEAR_RESORT,
  CLEAR_RESORT_LIST,
  GET_REVIEWS_BY_RESORT_ID,
  CLEAR_REVIEW_LIST,
  ADD_REVIEW,
  LOG_IN_USER,
  CLEAR_NOTIFICATION,
  CREATE_ACCOUNT,
  UPDATE_RESORT,
  CREATE_RESORT,
  DELETE_RESORT,
  AUTH_USER,
  SIGN_OUT,
  GET_ALL_REVIEWS,
  GET_ALL_USERS,
  DELETE_REVIEW,
  DELETE_USER,
  GET_USER_BY_ID,
  ACCOUNT_VERIFY,
} from '../types';

export const getResorts = (resortList) => ({
  type: GET_RESORTS,
  payload: resortList,
});

export const errorGlobal = (msg) => ({
  type: ERROR_GLOBAL,
  payload: msg,
});

export const successGlobal = (msg) => ({
  type: SUCCESS_GLOBAL,
  payload: msg,
});

export const getResortById = (resort) => ({
  type: GET_RESORT_BY_ID,
  payload: resort,
});

export const clearResort = () => ({
  type: CLEAR_RESORT,
});

export const clearResortList = () => ({
  type: CLEAR_RESORT_LIST,
});

export const getReviewsByResortId = (reviews) => ({
  type: GET_REVIEWS_BY_RESORT_ID,
  payload: reviews,
});

export const clearReviews = () => ({
  type: CLEAR_REVIEW_LIST,
});

export const addReview = (review) => ({
  type: ADD_REVIEW,
  payload: review,
});

export const logInUser = (user) => ({
  type: LOG_IN_USER,
  payload: user,
});

export const clearNotifications = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_NOTIFICATION,
    });
  };
};

export const createAccount = (userData) => ({
  type: CREATE_ACCOUNT,
  payload: userData,
});

export const updateResort = (resort) => ({
  type: UPDATE_RESORT,
  payload: resort,
});

export const createResort = (resort) => ({
  type: CREATE_RESORT,
  payload: resort,
});

export const deleteResort = (id) => ({
  type: DELETE_RESORT,
  payload: id,
});

export const authUser = (user) => ({
  type: AUTH_USER,
  payload: user,
});

export const signOut = () => ({ type: SIGN_OUT });

export const getAllReviews = (reviewsList) => ({
  type: GET_ALL_REVIEWS,
  payload: reviewsList,
});

export const getAllUsers = (usersList) => ({
  type: GET_ALL_USERS,
  payload: usersList,
});

export const deleteReview = (id) => ({
  type: DELETE_REVIEW,
  payload: id,
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});

export const getUserById = (id) => ({
  type: GET_USER_BY_ID,
  payload: id,
});

export const accountVerify = () => ({
  type: ACCOUNT_VERIFY,
});

// export const signOut = () => ({
//   type: SIGN_OUT,
// });
