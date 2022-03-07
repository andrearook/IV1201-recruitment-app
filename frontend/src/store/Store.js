import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/RootReducer';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

/**
 * The Redux Store
 * This is the store that keeps track of the state.
 */

/**
 * Redux persist is used to be able to refresh the page and still keep the 
 * state.
 */
const persistConfig = {
    key: 'root',
    storage,
};
const persisted = persistReducer(persistConfig, rootReducer);

/**
 * Redux Thunk middleware allows you to write action creators that return a function instead of an action. 
 * The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. 
 * 
 * composeWithDevTools to enable functionality of the dev tools in the browser.
 */
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(persisted, composedEnhancer);

export default store;

