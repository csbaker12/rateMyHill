import * as reviews from './index';
import axios from 'axios';
// import { getAuthHeaders } from '../../components/utils/tools';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getReviewsByResortId = (id) => {
  return async (dispatch) => {
    try {
      const reviewsData = await axios.get(`/review/manage/all/${id}`);
      dispatch(reviews.getReviewsByResortId(reviewsData.data));
    } catch (error) {
      dispatch(reviews.errorGlobal('Error fetching reviews'));
    }
  };
};

export const addReview = (review) => {
  return async (dispatch) => {
    try {
      const request = await axios.post(
        `/review/manage/${review.resortId}`,
        review
      );
      dispatch(reviews.addReview(request));
      dispatch(reviews.successGlobal('Review added!'));
    } catch (error) {
      dispatch(reviews.errorGlobal('Error adding review'));
    }
  };
};

export const getAllReviews = () => {
  return async (dispatch) => {
    try {
      const reviewList = await axios.get(`/review/manage`);
      dispatch(reviews.getAllReviews(reviewList.data));
      dispatch(reviews.successGlobal('Reviews fetched successfully'));
    } catch (error) {
      dispatch(reviews.errorGlobal('Error retrieving reviews'));
    }
  };
};

export const deleteReview = (id) => {
  return async (dispatch) => {
    try {
      const reviewData = await axios.delete(`/review/manage/delete/${id}`);
      dispatch(reviews.deleteReview(reviewData.data));
      dispatch(reviews.successGlobal('Review Deleted'));
    } catch (error) {
      dispatch(reviews.errorGlobal('Error deleting review'));
    }
  };
};
