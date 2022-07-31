import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { isValidObject } from "../../utils/Utilities";
import { Card, Tabs, Image } from "antd";
import Toggle from "../../components/common/toggle";
import { useForm } from "react-hook-form";
import { ThreeDots } from "../../components/common/Icons";

const { TabPane } = Tabs;

const DoctorById = () => {
  const { state } = useLocation();
  // const {back} = useRoutes()

  const [dData, setDData] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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
    offline_appointment_time,
    online_appointment_time,
    both_appointment_time,
    college_or_institute,
    completion_year,
    degree,
    doctor_registration_no,
    establishment_city,
    establishment_locality,
    establishment_name,
    experience_year,
    medical_registration_council,
    registration_year,
    identity_proof,
    establishment_proof,
    medical_proof,
    profile_image,
    offline_clinic_address,
    offline_first_time_fees,
    offline_normal_fees,
    online_clinic_address,
    online_first_time_fees,
    online_normal_fees,
    street_address,
  } = dData;

  return (
    <Fragment>
      <div className="row">
        <div className="d-flex align-items-center">
          <div className="col-9"></div>
          <div className="col-1">
            <button
              type="button"
              class="btn btn-secondary btn-sm dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span>Action</span>
              {/* <ThreeDots /> */}
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <button
                // onClick={() => goToDoctorById(_id, record)}
                class="dropdown-item"
                type="button"
              >
                Edit
              </button>
            </div>
          </div>
          <div className="col-2">
            <button className="btn">Go Back</button>
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
          <div className="col-6"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default DoctorById;
