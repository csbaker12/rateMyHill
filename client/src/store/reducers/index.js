import { combineReducers } from 'redux';
import resorts from './resort_reducer';
import notifications from './notifications_reducer';
import reviews from './reviews_reducer';
import users from './users_reducer';

const appReducers = combineReducers({
  resorts,
  notifications,
  reviews,
  users,
});

export default appReducers;
