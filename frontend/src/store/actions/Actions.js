/**
 * This file keeps track of all actions.
 * If file grows too large and loose cohesion we will
 * divide actions to its respective reducer.
 * 
 * Action has two parameters, type and payload.
 * This is then accessed in the reducer via action.type and action.payload.
 * 
 * Name conventions for type: 'nameOfReducer/describingNameOfAction'
 * The name of reducer is set in combineReducer funtion in
 * RootReducer.js
 */

const SET_PERSON = 'auth/setCurrentPerson';
const REMOVE_PERSON = 'auth/removeCurrentPerson';

export const setCurrentPerson = (person) => ({
    type: SET_PERSON,
    payload: person
});

export const removeCurrentPerson = () => ({
    type: REMOVE_PERSON,
});