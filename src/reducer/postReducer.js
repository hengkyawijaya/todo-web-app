import { FETCH_POSTS } from '../action/type';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_POSTS:
            return action.payload.data.post;
        default:
            return state
    }
}