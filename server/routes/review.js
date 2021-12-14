const express = require('express');
let router = express.Router();
const Review = require('../controllers/review');
const { checkLoggedIn } = require('../middleware/auth');
const { grantAccess } = require('../middleware/roles');

router.route('/manage/:resortId').post(checkLoggedIn, Review.postReview);
router.route('/manage/delete/:reviewId').delete(Review.deleteReview);
router.route('/manage/review/:reviewId').get(Review.getReviewById);
router.route('/manage/all/:resortId').get(Review.getReviewsByResortId);
router.route('/manage').get(Review.getAllReviews);

module.exports = router;
