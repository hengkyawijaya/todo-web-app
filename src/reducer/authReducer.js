import { LOGIN_AUTH, CHECK_AUTH , LOGOUT_AUTH } from '../action/type';

export default function (state = false, action) {
    switch (action.type) {
        case CHECK_AUTH:
            return action.payload.data.user;

        case LOGIN_AUTH: {
            return action.payload.data.token
        }
        case LOGOUT_AUTH: {
            return action.payload
        }
        default:
            return state
    }
}