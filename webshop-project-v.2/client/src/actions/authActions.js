import axios from 'axios'
import { returnErrors } from './errorActions'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_REGISTER_SUCCESS,
    ADD_TO_CART,
    // Below under performance improvement
    // GET_USERS,
    // USERS_LOADING
    ADMIN_LOADED,
    ADMIN_LOADING
} from './types'

// In Process of performance Improvement
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING })

    axios.get('/api/auth/user', tokenConfig(getState))
        .then( (res => 
                dispatch ({
                    type: USER_LOADED,
                    payload: res.data
                })           
        ))
        // TRY THIS -> create a supportive function to be activated once it checks that a user is loaded, 
        // and if the user that is loaded is an admin, it will dispatch a LOGOUT_SUCCESS and then dispatch USER_LOADING -> ADMIN_LOADED,
        // if the user is an admin which will be checked once the user is logged in which is.. where?
        // .then( (res => {
        //     if (JSON.parse(res.request.response).userType === 'admin') {
        //         dispatch ({
        //             type: ADMIN_LOADED,
        //             payload: res.data
        //         })
        //     }
        // }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'AUTH_ERROR'))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const register = ({ userType, firstname, surname, email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ userType, firstname, surname, email, password })

    axios.post('/api/users', body, config)
    .then( (res => {
        if(res.data.user.userType === 'admin') {
            dispatch ({
                type: ADMIN_REGISTER_SUCCESS,
                payload: res.data
            })  
        }
        if(res.data.user.userType === 'basic') {
            dispatch ({
                type: REGISTER_SUCCESS,
                payload: res.data
            })  
        } 
    }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

export const login = ({ email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })
    axios.post('/api/auth', body, config)
        .then( (res => {
            if(res.data.user.userType === 'admin') {
                dispatch ({
                    type: ADMIN_LOGIN_SUCCESS,
                    payload: res.data
                })  
            }
            if(res.data.user.userType === 'basic') {
                dispatch ({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })  
            } 
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        }) 
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const addToCart = (id) => (dispatch, getState) => {
    axios.get(`/api/auth/addToCart?productId=${id}`, tokenConfig(getState)).then(res => 
        dispatch({
            type: ADD_TO_CART,
            payload: res.data
        })
        )
}

export const loadAdmin = () => (dispatch, getState) => {
    dispatch({ type: LOGOUT_SUCCESS })
    dispatch({ type: ADMIN_LOADING })

    axios.get('/api/auth/user', tokenConfig(getState))
    .then((res => 
        dispatch ({
            type: ADMIN_LOADED,
            payload: res.data
        })           
        ))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'AUTH_ERROR'))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

/**
 * The token settings
 *  
 */
export const tokenConfig = getState => {
    const token = getState().auth.token
    
    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }

    if(token) {
        config.headers['x-auth-token'] = token
    }

    return config 
}

