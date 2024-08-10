/** @format */

// reducers/refreshReducer.js
import { SET_REFRESH } from "../actions/refreshActions";

const initialState = {
  isRefreshing: false,
};

const refreshReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case SET_REFRESH:
      return {
        ...state,
        isRefreshing: action.payload,
      };
    default:
      return state;
  }
};

export default refreshReducer;
