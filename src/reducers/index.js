import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { photosReducer } from './photoReducer';

/**
 * @typedef rootReducer
 * @property {UsersReducerState} user
 * @property {PhotosReducerState} user
 *
 *
 */

export default combineReducers({
  users: usersReducer,
  photosReducer: photosReducer,
});
