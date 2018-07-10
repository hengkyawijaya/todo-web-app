import { ERROR , SUCCESS} from "../action/type";

export default function (state=false, action) {
    switch (action.type)
    {
        case SUCCESS:
            return action.payload.status;

        case ERROR:
            return {...state, ...action.payload.response.data.status}
        
        default:
            return state;
    }


}