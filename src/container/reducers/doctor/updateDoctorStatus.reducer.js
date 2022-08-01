import { UPDATE_DOCTOR_STATUS_SUCCESS, UPDATE_DOCTOR_STATUS_FAILURE } from '../../constants/index';
import { onSuccess, onFailure } from '../common';

// const initialState = { data: [], error: false, errorMessage: "", isLoading: true };
const initialState = { result: [], success: false, message: "", isLoading: true };

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DOCTOR_STATUS_SUCCESS:
            return onSuccess(state, action);
        case UPDATE_DOCTOR_STATUS_FAILURE:
            return onFailure(state, action);
        default:
            return { ...state }
    }
}