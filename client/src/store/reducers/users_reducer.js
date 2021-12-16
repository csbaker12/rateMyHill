import {
  CREATE_ACCOUNT,
  AUTH_USER,
  SIGN_OUT,
  GET_ALL_USERS,
  DELETE_USER,
  GET_USER_BY_ID,
  UPDATE_USER,
} from '../types';

let DEFAULT_USER_STATE = {
  data: {
    _id: null,
    email: null,
    username: null,
    role: null,
    verified: null,
  },
  auth: false,
};

export default function resortReducer(state = {}, action) {
  switch (action.type) {
    // case LOG_IN_USER:
    //   return { ...state, user: action.payload, isAuth: true };
    case CREATE_ACCOUNT:
      return { ...state, newUser: action.payload, isAuth: true };
    case AUTH_USER:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        auth: action.payload.auth,
      };
    case SIGN_OUT:
      return { ...state, data: { ...DEFAULT_USER_STATE.data }, auth: false };
    case GET_ALL_USERS:
      return { ...state, userList: action.payload };
    case DELETE_USER:
      return { ...state, deletedUser: action.payload };
    case GET_USER_BY_ID:
      return { ...state, currentUser: action.payload };
    case UPDATE_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}
