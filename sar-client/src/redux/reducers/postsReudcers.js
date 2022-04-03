import {
    ADD_POST_FAIL,
    ADD_POST_REQUEST,
    ADD_POST_RESET,
    ADD_POST_SUCCESS,
    EDIT_POST_FAIL,
    EDIT_POST_REQUEST,
    EDIT_POST_RESET,
    EDIT_POST_SUCCESS,
    GET_POSTS_FAIL,
    GET_POSTS_REQUEST,
    GET_POSTS_RESET,
    GET_POSTS_SUCCESS,
    SET_CURRENT_POST,
    SET_CURRENT_POST_RESET
} from '../constants/postsConstants'

export const getPostsReducer = (state = { posts: [] }, action) => {
     switch (action.type) {
        case GET_POSTS_REQUEST:
            return { loading: true, posts: [] }
        case GET_POSTS_SUCCESS:
            return {
                loading: false,
                posts: action.payload,
            }
        case GET_POSTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
     }
}

export const addNewPostReducer = (state = {}, action) => {
     switch (action.type) {
        case ADD_POST_REQUEST:
            return { loading: true }
        case ADD_POST_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case ADD_POST_FAIL:
             return { loading: false, error: action.payload }
         case ADD_POST_RESET:
            return {  }
        default:
            return state
     }
}

export const updatePostReducer = (state = {}, action) => {
     switch (action.type) {
        case EDIT_POST_REQUEST:
            return { loading: true }
        case EDIT_POST_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case EDIT_POST_FAIL:
             return { loading: false, error: action.payload }
         case EDIT_POST_RESET:
            return {  }
        default:
            return state
     }
}

export const setCurrentPostReducer = (state = { currentPost: {} }, action) => {
     switch (action.type) {
        case SET_CURRENT_POST:
            return {
                currentPost: action.payload,
            }
        case SET_CURRENT_POST_RESET:
             return {
                 currentPost: {}
             }
        default:
            return state
     }
}