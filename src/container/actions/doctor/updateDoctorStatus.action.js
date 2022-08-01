import { UPDATE_DOCTOR_STATUS_SUCCESS, UPDATE_DOCTOR_STATUS_FAILURE } from '../../constants/index'
import { putRequest } from "../../../utils/apiUtils";

export const updateDoctorStatusSuccess = (result) => {
    return {
        type: UPDATE_DOCTOR_STATUS_SUCCESS,
        payload: result
    }
}

export const updateDoctorStatusFailure = (result) => {
    return {
        type: UPDATE_DOCTOR_STATUS_FAILURE,
        payload: result
    }
}

export const updateDoctorStatus = ({data, id}) => {
    return async (dispatch, getState) => {
        const { result, error } = await putRequest(`updatedoctorstatus/${id}`, data);

        if (!error) {
            return dispatch(updateDoctorStatusSuccess(result))
        }
        else {
            return dispatch(updateDoctorStatusFailure(result))
        }

    }
    // const response = await postRequest(`login`, data);
}