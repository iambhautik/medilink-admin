import { combineReducers } from "redux";

import DoctorListReducer from './doctor/getAllDoctor.reducer';
import AdminLoginReducer from './login/adminLogin.reducer';
import UpdateDoctorStatus from './doctor/updateDoctorStatus.reducer';
import UpdateDoctorDetails from './doctor/updateDoctorDetails.reducer'

const rootReducer = combineReducers({
  doctorListReducer: DoctorListReducer,
  adminLoginReducer: AdminLoginReducer,
  updateDoctorStatus: UpdateDoctorStatus,
  updateDoctorDetails: UpdateDoctorDetails
});

export default rootReducer;