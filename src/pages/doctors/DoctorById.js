import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isValidObject, sendNotification } from "../../utils/Utilities";
import { Card, Tabs, Image, Button } from "antd";
import { updateDoctorStatus } from "../../container/actions/doctor/updateDoctorStatus.action";
import { useDispatch } from "react-redux";
import Editable from "./editable";

const { TabPane } = Tabs;

const DoctorById = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  // const {back} = useRoutes()

  const { dId } = useParams();

  const [dData, setDData] = useState([]);
  const [toggleInput, setToggleInput] = useState(true)

  useEffect(() => {
    if (isValidObject(state)) {
      setDData([state]);
    }
  }, [state]);

  const takeAction = ({ status, id }) => {
    dispatch(updateDoctorStatus({ data: { status }, id })).then((res) => {
      const { payload } = res;
      if (payload.success) {
        sendNotification({ type: "success", message: payload.message });
      } else {
        sendNotification({ type: "error", message: "Something went wrong" });
      }
    });
  };

  const toggleInputState = () => {
    if(toggleInput){
      document.querySelectorAll('input').forEach((ele) => {
        ele.removeAttribute('disabled')
      })
      document.querySelectorAll('select').forEach((ele) => {
        ele.removeAttribute('disabled')
      })
      document.querySelectorAll('textarea').forEach((ele) => {
        ele.removeAttribute('disabled')
      })
    }
    if(!toggleInput){
      document.querySelectorAll('input').forEach((ele) => {
        ele.setAttribute('disabled', '')
      })
      document.querySelectorAll('select').forEach((ele) => {
        ele.setAttribute('disabled', '')
      })
      document.querySelectorAll('textarea').forEach((ele) => {
        ele.setAttribute('disabled', '')
      })
    }
    setToggleInput(!toggleInput)
  }

  return (
    <Fragment>
      <div className="row">
        <div className="d-flex align-items-center">
          <div className="w-100 d-flex justify-content-between">
            <div>
              <button
                onClick={() => takeAction({ status: 1, id: dId })}
                className="btn btn-primary mx-2"
              >
                Approve
              </button>
              <button
                onClick={() => takeAction({ status: 2, id: dId })}
                className="btn btn-primary mx-2"
              >
                Reject
              </button>
              <button
                onClick={() => toggleInputState()}
                className="btn btn-primary"
              >
                {toggleInput ? 'Edit' : 'Update Profile'}
              </button>
            </div>
            <div>
              <button onClick={() => navigate(-1)} className="btn btn-primary">
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <Editable doctorData={dData} toggleInput={toggleInput} />
    </Fragment>
  );
};

export default DoctorById;
