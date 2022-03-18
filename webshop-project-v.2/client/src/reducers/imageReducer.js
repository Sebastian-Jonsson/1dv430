import { GET_IMAGES, ADD_IMAGE, DELETE_IMAGE, IMAGES_LOADING } from '../actions/types'

const initialState = {
    items: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_IMAGES:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case DELETE_IMAGE:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        case ADD_IMAGE:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case IMAGES_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}