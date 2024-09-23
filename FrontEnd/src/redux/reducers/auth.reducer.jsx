import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../actions/type.actions";

const token = localStorage.getItem("token") || sessionStorage.getItem("token") 

/* État initial de l'authentification */
const initialState = {
    status: "VOID",
    isConnected: !!token,
    token: token || null,
    error: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                status: "SUCCEEDED",
                isConnected: true,
                token: action.payload,
                error: null
            }
        
        case LOGIN_FAIL: {
            return {
                ...state,
                status: "FAILED",
                isConnected: false,
                error: action.payload
            }
        }  
        case LOGOUT: {
            localStorage.removeItem("token")
            return {
                ...state,
                status: "LOGOUT",
                isConnected:false,
                token:null,
                error: null,

            };
        }  
        default:
            return state;
    }
}