const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config();

const reviewSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, 'You need some content'],
  },

  author: {
    type: String,
    required: [true, 'Author is required'],
  },

  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
  },

  date: {
    type: Date,
    default: Date.now,
  },
  isActive: { type: Boolean, default: true },
});

const resortSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email Address');
      }
    },
  },
  name: {
    type: String,
    required: [true, 'resort needs a name'],
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'please provide a valid phone number'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'please provide a valid address'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'please provide a valid city'],
    trim: true,
  },
  state: {
    type: String,
    required: [true, 'please provide a valid state'],
    trim: true,
  },
  postalCode: {
    type: String,
    required: [true, 'please provide a valid postal code'],
    trim: true,
  },
  longitude: {
    type: Number,
    required: [true, 'Please provide a valid longitude'],
    trim: true,
  },
  latitude: {
    type: Number,
    required: [true, 'Please provide a valid latitude'],
    trim: true,
  },
  website: { type: String, trim: true },
  description: { type: String, trim: true },
  runs: { type: Number },
  lifts: { type: Number },
  rating: { type: [Number] },
  isActive: { type: Boolean, default: true },
  reviews: { type: [String] },
  userId: { type: String, trim: true },
});

const Resort = mongoose.model('Resort', resortSchema);
const Review = mongoose.model('Review', reviewSchema);
module.exports = {
  Resort,
  Review,
  create: async (data) => {
    let success = false;
    try {
      let resort = new Resort({
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        website: data.website ? data.website : '',
        description: data.description ? data.description : '',
        runs: data.runs ? data.runs : 0,
        lifts: data.lifts ? data.lifts : 0,
        longitude: data.longitude,
        latitude: data.latitude,
        userId: data.userId ? data.userId : '',
      });
      const doc = await resort.save();
      if (doc) {
        success = true;
      }
      return { resort, success };
    } catch (error) {
      console.log('error creating resort');
      return { success: false };
    }
  },
  fetchAll: async () => {
    let success = false;
    try {
      const resorts = await Resort.find();
      if (resorts) {
        success = true;
      }
      return { resorts, success };
    } catch (error) {
      console.log('error fetching resorts in model');
      return { success: false };
    }
  },
  update: async (data) => {
    let success = false;
    try {
      const resort = await Resort.findOneAndUpdate(
        { _id: data._id },
        {
          $set: {
            email: data.email,
            name: data.name,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            website: data.website ? data.website : null,
            description: data.description ? data.description : null,
            runs: data.runs ? data.runs : null,
            lifts: data.lifts ? data.lifts : null,
            longitude: data.longitude,
            latitude: data.latitude,
          },
        },
        { new: true }
      );
      if (resort) {
        success = true;
      }
      return { resort, success };
    } catch (error) {
      console.log('error updating the resort');
      return { success: false };
    }
  },
  findById: async (id) => {
    let success = false;
    let resortRating = 0;
    let ratingSum = 0;
    try {
      const resort = await Resort.findById(id);
      if (resort) {
        success = true;

        if (resort.rating.length >= 1) {
          for (let i = 0; i < resort.rating.length; i++) {
            ratingSum += resort.rating[i];
          }
          resortRating = ratingSum / resort.rating.length;
        } else {
          resortRating = 0;
        }
      }
      return { resort, success, resortRating };
    } catch (error) {
      console.log('could not find this resort');
      return { sucess: false };
    }
  },
  delete: async (id) => {
    let success = false;
    try {
      const resort = await Resort.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            isActive: false,
          },
        },
        { new: true }
      );
      if (resort) {
        success = true;
      }
      return { resort, success };
    } catch (error) {
      console.log('could not find and delete this resort');
      return { sucess: false };
    }
  },
  addReview: async (data) => {
    let success = false;
    try {
      let review = new Review({
        author: data.author,
        content: data.content,
        rating: data.rating,
      });
      const doc = await review.save();
      if (doc) {
        success = true;
      }
      return { doc, success };
    } catch (error) {
      console.log('could not add review');
      return { sucess: false };
    }
  },
  addReviewToResort: async (resortId, reviewId, rating) => {
    let success = false;
    try {
      let resort = await Resort.findOneAndUpdate(
        { _id: resortId },
        {
          $push: {
            reviews: reviewId,
            rating: rating,
          },
        },
        { new: true }
      );
      if (resort) {
        success = true;
      }
      return { resort, success };
    } catch (error) {
      console.log('could not add review to resort');
      return { sucess: false };
    }
  },
  deleteReview: async (id) => {
    let success = false;
    try {
      console.log(id);
      let review = await Review.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            isActive: false,
          },
        },
        { new: true }
      );
      if (review) {
        success = true;
      }

      return { review, success };
    } catch (error) {
      console.log('could not delete this review');
      return { sucess: false };
    }
  },
  fetchReviewById: async (id) => {
    let success = false;
    try {
      let review = await Review.findById(id);
      if (review) {
        success = true;
      }
      return { review, success };
    } catch (error) {
      console.log('could not get review pal');
      return { success: false };
    }
  },
  fetchAllReviews: async () => {
    let success = false;
    try {
      let reviewList = await Review.find();
      if (reviewList) {
        success = true;
      }
      return { reviewList, success };
    } catch (error) {
      console.log('could not get reviews pal');
      return { success: false };
    }
  },
};
