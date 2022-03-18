import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_USERS,
    USERS_LOADING,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOADED,  // Performance Improvement required
    ADMIN_REGISTER_SUCCESS,
    ADMIN_LOADING,
    ADD_TO_CART
} from '../actions/types'


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isAdmin: null,
    isLoading: false,
    user: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case USERS_LOADING:
        case ADMIN_LOADING:
        case USER_LOADING:
            return{
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isAdmin: false,
                isLoading: false,
                user: action.payload
            }
            // ADD_TO_CART - Not Yet Implemented
        case ADD_TO_CART:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    cart: action.payload
                }
            }
        case ADMIN_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isAdmin: true,
                isLoading: false,
                user: action.payload 
            }
        case ADMIN_LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isAdmin: true,
                isLoading: false
            }
        case ADMIN_REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isAdmin: true,
                isLoading: false
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isAdmin: false,
                isLoading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isAdmin: false,
                isLoading: false
            }
        default:
            return state

    }
}