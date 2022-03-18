import axios from 'axios'
import { GET_IMAGES, ADD_IMAGE, DELETE_IMAGE, IMAGES_LOADING } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const getImages = () => dispatch => {
    dispatch(setItemsLoading())
    axios.get('/api/images').then(res => 
            dispatch({
                type: GET_IMAGES,
                payload: res.data
            }))
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const addImage = (image) => (dispatch, getState) => { 
    axios.post('/api/images', image, tokenConfig(getState)).then(res =>
        dispatch({
            type: ADD_IMAGE,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteItem = (id) => (dispatch, getState) => {
    axios.delete(`/api/images/${id}`, tokenConfig(getState)).then(res => 
        dispatch({
            type: DELETE_IMAGE,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setItemsLoading = () => {
    return {
        type: IMAGES_LOADING
    }
}