import { UPDATE_DOCTOR_DETAILS_SUCCESS, UPDATE_DOCTOR_DETAILS_FAILURE } from '../../constants/index'
import { putRequest } from "../../../utils/apiUtils";

export const updateDoctorDetailsSuccess = (result) => {
    return {
        type: UPDATE_DOCTOR_DETAILS_SUCCESS,
        payload: result
    }
}

export const updateDoctorDettailsFailure = (result) => {
    return {
        type: UPDATE_DOCTOR_DETAILS_FAILURE,
        payload: result
    }
}

export const updateDoctorDetails = ({data, id}) => {
    return async (dispatch, getState) => {
        const { result, error } = await putRequest(`updatedoctorbyadmin/${id}`, data);

        if (!error) {
            return dispatch(updateDoctorDetailsSuccess(result))
        }
        else {
            return dispatch(updateDoctorDettailsFailure(result))
        }

    }
    // const response = await postRequest(`login`, data);
}