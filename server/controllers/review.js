const Review = require('../models/resort');

exports.postReview = async (req, res) => {
  try {
    let id = req.params.resortId;
    let data = req.body;
    let review = await Review.addReview(data);
    if (review.success) {
      let resort = await Review.addReviewToResort(
        id,
        review.doc._id,
        review.doc.rating
      );
      if (resort.success) {
        res.status(200).json({ resort: resort.resort });
      } else {
        res.status(400).json({ message: 'Error adding review' });
      }
    } else {
      res.status(400).json({ message: 'Error posting review' });
    }
  } catch (error) {
    res.status(400).json({ message: 'didnt nail that' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    let reviewId = req.params.reviewId;
    let review = await Review.deleteReview(reviewId);
    if (review.success) {
      res.status(400).json({ message: 'Review deleted' });
    } else {
      res.status(400).json({ message: 'Could not delete review' });
    }
  } catch (error) {
    res.status(400).json({ message: 'that was not it chief' });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    let id = req.params.reviewId;
    let review = await Review.fetchReviewById(id);
    if (review.success) {
      res.status(200).json({ review: review.review });
    } else {
      res.status(400).json({ message: 'Could not find review' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Cannot find it bud' });
  }
};

exports.getReviewsByResortId = async (req, res) => {
  try {
    let resortId = req.params.resortId;
    let resort = await Review.findById(resortId);
    if (resort.success) {
      let reviews = [];
      for (let i = 0; i < resort.resort.reviews.length; i++) {
        let review = await Review.fetchReviewById(resort.resort.reviews[i]);
        reviews.push(review);
      }
      console.log(reviews);
      if (reviews) {
        return res.status(200).json({ resort: reviews });
      } else {
        return res.status(400).json({ message: 'Could not find reviews' });
      }
    } else {
      return res.status(400).json({ message: 'Could not find resort' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Cannot find it bud' });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    let reviewList = await Review.fetchAllReviews();
    if (reviewList.success) {
      return res.status(200).json({ reviews: reviewList.reviewList });
    } else {
      return res.status(400), json({ message: 'problems bud' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Cannot find em bud' });
  }
};
