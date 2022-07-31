import { GET_DOCTOR_LIST_SUCCESS, GET_DOCTOR_LIST_FAILURE } from '../../constants/index';
import { onSuccess, onFailure } from '../common';

// const initialState = { data: [], error: false, errorMessage: "", isLoading: true };
const initialState = { result: [], success: false, message: "", isLoading: true };

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_DOCTOR_LIST_SUCCESS:
            return onSuccess(state, action);
        case GET_DOCTOR_LIST_FAILURE:
            return onFailure(state, action);
        default:
            return { ...state }
    }
}