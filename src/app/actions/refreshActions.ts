/** @format */

// actions/refreshActions.js
export const SET_REFRESH = "SET_REFRESH";

export const setRefresh = (isRefreshing: boolean) => ({
  type: SET_REFRESH,
  payload: isRefreshing,
});
