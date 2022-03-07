import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./AuthReducer";

/**
 * This is the Root Reducer.
 * 
 * It uses combineReducers to separate the state object
 * into slices, where each slice is its own spearate reducer. 
 * 
 * Name of reducer : The imported reducer
 */
const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;