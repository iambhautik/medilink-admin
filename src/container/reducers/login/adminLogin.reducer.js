import { ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILURE } from '../../constants/index';
import { onSuccess, onFailure } from '../common';

// const initialState = { data: [], error: false, errorMessage: "", isLoading: true };
const initialState = { result: [], success: false, message: "", isLoading: true };

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_LOGIN_SUCCESS:
            return onSuccess(state, action);
        case ADMIN_LOGIN_FAILURE:
            return onFailure(state, action);
        default:
            return { ...state }
    }
}