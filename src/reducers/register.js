import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from '../actions/register';

export default function register(state = {
    isFetching: false,
    errorMessage: ''
}, action) {
    switch (action.type) {
        case REGISTER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: '',
            });
        case REGISTER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload,
            });
        default:
            return state; 
    }
}
