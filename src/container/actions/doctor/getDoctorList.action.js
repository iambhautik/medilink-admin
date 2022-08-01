import { GET_DOCTOR_LIST_SUCCESS, GET_DOCTOR_LIST_FAILURE } from '../../constants/index'
import { getRequest } from "../../../utils/apiUtils";

export const getDoctorListSuccess = (result) => {
    return {
        type: GET_DOCTOR_LIST_SUCCESS,
        payload: result
    }
}

export const getDoctorListFailure = (result) => {
    return {
        type: GET_DOCTOR_LIST_FAILURE,
        payload: result
    }
}

export const GetAllDoctors = () => {
    return async (dispatch, getState) => {
        const { result, error } = await getRequest(`getdoctorlistbyadmin`);

        if (!error) {
            return dispatch(getDoctorListSuccess(result))
        }
        else {
            return dispatch(getDoctorListFailure(result))
        }

    }
    // const response = await postRequest(`login`, data);
}