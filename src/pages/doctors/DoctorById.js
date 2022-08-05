import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isValidObject, sendNotification } from "../../utils/Utilities";
import { Card, Tabs, Image, Button } from "antd";
import { updateDoctorStatus } from "../../container/actions/doctor/updateDoctorStatus.action";
import { useDispatch } from "react-redux";

const { TabPane } = Tabs;

const DoctorById = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  // const {back} = useRoutes()

  const { dId } = useParams();

  const [dData, setDData] = useState({});

  useEffect(() => {
    if (isValidObject(state)) {
      setDData(state);
    }
  }, [state]);

  const {
    mobile,
    email,
    username,
    city,
    doctor_name,
    gender,
    specialization,
    degree,
    identity_proof,
    establishment_proof,
    medical_proof,
    establishment_city,
    establishment_locality,
    establishment_name,
    // offline_appointment_time,
    // online_appointment_time,
    // both_appointment_time,
    college_or_institute,
    completion_year,
    doctor_registration_no,
    // experience_year,
    medical_registration_council,
    registration_year,
    // profile_image,
    // offline_clinic_address,
    // offline_first_time_fees,
    // offline_normal_fees,
    // online_clinic_address,
    // online_first_time_fees,
    // online_normal_fees,
    // street_address,
  } = dData;

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
                className="btn btn-primary"
              >
                Reject
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
      <div className="row mt-3">
        <div className="d-flex">
          <div className="col-6">
            <Card title="Doctor Info">
              <div className="row">
                <div className="d-flex">
                  <div className="col-3">Name</div>
                  <div className="col-9">{doctor_name}</div>
                </div>
              </div>
              <div className="row">
                <div className="d-flex">
                  <div className="col-3">Username</div>
                  <div className="col-9">{username}</div>
                </div>
              </div>
              <div className="row">
                <div className="d-flex">
                  <div className="col-3">Email</div>
                  <div className="col-9">{email}</div>
                </div>
              </div>
              <div className="row">
                <div className="d-flex">
                  <div className="col-3">Mobile No.</div>
                  <div className="col-9">{mobile}</div>
                </div>
              </div>
              <div className="row">
                <div className="d-flex">
                  <div className="col-3">City</div>
                  <div className="col-9">{city}</div>
                </div>
              </div>
              <div className="row">
                <div className="d-flex">
                  <div className="col-3">Gender</div>
                  <div className="col-9">{gender}</div>
                </div>
              </div>
              <div className="row">
                <div className="d-flex">
                  <div className="col-3">Degree</div>
                  <div className="col-9">{degree}</div>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-6">
            <Card title="Doctor Specilazation">
              <div className="row">
                <div className="d-flex">
                  <div className="col-3">Specilazation</div>
                  <div className="col-9">
                    {specialization?.map(({ label }, i) => {
                      return <Fragment key={i}>{label}</Fragment>;
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="d-flex">
          <div className="col-6">
            <Card title="Doctor Documents">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Identity Proof" key="1">
                  <Image src={identity_proof} />
                </TabPane>
                <TabPane tab="Medical Proof" key="2">
                  <Image src={medical_proof} />
                </TabPane>
                <TabPane tab="Establishment Proof" key="3">
                  <Image src={establishment_proof} />
                </TabPane>
              </Tabs>
            </Card>
          </div>
          <div className="col-6">
            <Card title="Establishment Details">
              <div className="row">
                <div className="d-flex">
                  <div className="col-6">Establishment Name</div>
                  <div className="col-6">{establishment_name}</div>
                </div>
              </div>
              <div className="row">
                <div className="d-flex">
                  <div className="col-6">Establishment City</div>
                  <div className="col-6">{establishment_city}</div>
                </div>
              </div>
              <div className="row">
                <div className="d-flex">
                  <div className="col-6">Establishment Locality</div>
                  <div className="col-6">{establishment_locality}</div>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
      <div className="row my-3">
        <div className="d-flex">
          <div className="col-6">
            <Card title="Education Details">
            <div className="row">
                <div className="d-flex">
                  <div className="col-6">College / Institute</div>
                  <div className="col-6">{college_or_institute}</div>
                </div>
              </div>
            <div className="row">
                <div className="d-flex">
                  <div className="col-6">Completion Yesr</div>
                  <div className="col-6">{completion_year}</div>
                </div>
              </div>
            <div className="row">
                <div className="d-flex">
                  <div className="col-6">Doctor Registration Number</div>
                  <div className="col-6">{doctor_registration_no}</div>
                </div>
              </div>
            <div className="row">
                <div className="d-flex">
                  <div className="col-6">Medical Councile</div>
                  <div className="col-6">{medical_registration_council}</div>
                </div>
              </div>
            <div className="row">
                <div className="d-flex">
                  <div className="col-6">Registration Year</div>
                  <div className="col-6">{registration_year}</div>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-6">
            <Card title="Establishment Details">
              <div className="row">
                <div className="d-flex">
                  <div className="col-6">Establishment Name</div>
                  <div className="col-6">{establishment_name}</div>
                </div>
              </div>
              <div className="row">
                <div className="d-flex">
                  <div className="col-6">Establishment City</div>
                  <div className="col-6">{establishment_city}</div>
                </div>
              </div>
              <div className="row">
                <div className="d-flex">
                  <div className="col-6">Establishment Locality</div>
                  <div className="col-6">{establishment_locality}</div>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default DoctorById;
