import {
  GET_REVIEWS_BY_RESORT_ID,
  CLEAR_REVIEW_LIST,
  ADD_REVIEW,
  GET_ALL_REVIEWS,
  DELETE_REVIEW,
} from '../types';

export default function resortReducer(state = {}, action) {
  switch (action.type) {
    case GET_REVIEWS_BY_RESORT_ID:
      return { ...state, reviews: action.payload };
    case CLEAR_REVIEW_LIST:
      return { ...state, reviews: null };
    case ADD_REVIEW:
      return { ...state, lastReviewAdded: action.payload, success: true };
    case GET_ALL_REVIEWS:
      return { ...state, reviewList: action.payload };
    case DELETE_REVIEW:
      return { ...state };
    default:
      return state;
  }
}
