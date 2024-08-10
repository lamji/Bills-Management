/** @format */

// reducers/index.js
import { combineReducers } from "redux";
import refreshReducer from "./refreshReducer";
// Import other reducers here

const rootReducer = combineReducers({
  refresh: refreshReducer,
  // Add other reducers here
});

export default rootReducer;
