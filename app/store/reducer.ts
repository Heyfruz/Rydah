import { combineReducers } from 'redux';

import { auth, product } from './features';

export default combineReducers({
  auth,
  product,
});
