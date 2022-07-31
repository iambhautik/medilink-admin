import { combineReducers } from "redux";

import DoctorListReducer from './doctor/getAllDoctor.reducer'

const rootReducer = combineReducers({
  doctorListReducer: DoctorListReducer
});

export default rootReducer;