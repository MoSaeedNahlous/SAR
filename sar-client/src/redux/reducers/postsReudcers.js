import {
    GET_POSTS_FAIL,
    GET_POSTS_REQUEST,
    GET_POSTS_RESET,
    GET_POSTS_SUCCESS
} from '../constants/postsConstants'

export const getPostsReducer = (state = { posts: [] }, action) => {
     switch (action.type) {
        case GET_POSTS_REQUEST:
            return { loading: true, posts: [] }
        case GET_POSTS_SUCCESS:
            return {
                loading: false,
                posts: action.payload.products,
            }
        case GET_POSTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
     }
}