import storage from "redux-persist/lib/storage";

const initialState = {
    person: {
        name: '',
        surname: '',
        username: '',
    }
};

/**
 * This is the authReducer
 * Keeps track of authorization state about a person
 * 
 * @param {State} state First set to {} when creating the store but is set to initialState here
 * @param {action} action action.type: action to be performed. action.payload: data
 * @returns state
 */
function authReducer(state = initialState, action) {
    switch(action.type) {
        case 'auth/setCurrentPerson': {
            return {
                ...state,
                person: action.payload,
            };
        }
        case 'auth/removeCurrentPerson': {
            return {
                ...initialState,
            };
        }
        default: 
            return state;
    }
}
export default authReducer;