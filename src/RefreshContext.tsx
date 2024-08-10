/** @format */

// RefreshContext.js
import React, { createContext, useContext, useState, ReactNode } from "react";
import { setRefresh } from "./app/actions/refreshActions";
import { useDispatch } from "react-redux";

const RefreshContext = createContext({});

export const useRefresh = () => useContext(RefreshContext);

export const RefreshProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const triggerRefresh = () => {
    dispatch(setRefresh(true));
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(setRefresh(false));
    }, 2000); // Simulate a refresh operation
  };

  return (
    <RefreshContext.Provider value={{ refreshing, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};
