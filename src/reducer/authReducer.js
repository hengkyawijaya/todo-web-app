import { LOGIN_AUTH, CHECK_AUTH } from '../action/type';

export default function (state = false, action) {
    switch (action.type) {
        case CHECK_AUTH:
            return action.payload.data.user;
        default:
            return state
    }
}