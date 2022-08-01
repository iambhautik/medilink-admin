import { ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILURE } from '../../constants/index'
import { postRequest } from "../../../utils/apiUtils";

export const adminLoginSuccess = (result) => {
    return {
        type: ADMIN_LOGIN_SUCCESS,
        payload: result
    }
}

export const adminLoginFailure = (result) => { 
    return {
        type: ADMIN_LOGIN_FAILURE,
        payload: result
    }
}

export const adminLogin = (data) => {
    return async (dispatch, getState) => {
        const { result, error } = await postRequest(`adminlogin`, data);

        if (!error) {
            return dispatch(adminLoginSuccess(result))
        }
        else {
            return dispatch(adminLoginFailure(result))
        }

    }
    // const response = await postRequest(`login`, data);
}