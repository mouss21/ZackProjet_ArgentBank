import { GET_USERPROFILE, EDIT_USERNAME, LOGOUT } from "../actions/type.actions"

/* État utilisateur initial */
const initialState = {
    status: 'VOID',
    userData: JSON.parse(localStorage.getItem("user")) || {}
}

export const userReducer = (state = initialState, action ) => {
    switch (action.type) {
        case GET_USERPROFILE:
            localStorage.setItem("user", JSON.stringify(action.payload))
            return {
                ...state,
                status: 'SUCCEEDED',
                userData: action.payload
            }
        case EDIT_USERNAME: 
            return {
                ...state,
                status: "MODIFIED",
                userData: {
                    ...state.userData,
                    username: action.payload
                } 
            } 
        case LOGOUT: {
            localStorage.removeItem("user")
            return initialState;  
        }   
        default:
            return state;    
    }
}

        