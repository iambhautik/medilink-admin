import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  handleImageUpload,
  isValidObject,
  sendNotification,
} from "../../utils/Utilities";
import { Card, Tabs, Image, Button } from "antd";
import { updateDoctorStatus } from "../../container/actions/doctor/updateDoctorStatus.action";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const { TabPane } = Tabs;

const DoctorDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const imageRef = useRef();

  const { dId } = useParams();

  const [disabled, setDisabled] = useState(true);
  const [dData, setDData] = useState([]);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    if (isValidObject(state)) {
      setDData([state]);
    }
  }, [state]);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // specialization: formData?.[0]?.specialization,
    },
  });

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

  const handleImagesUpload = async (e) => {
    let size = e?.target?.files[0]?.size;

    if (size < 700000) {
      let name = e.target.name;
      let base64URL = await handleImageUpload(e, name);
      setProfilePic(() => base64URL);
      setValue("profile_image", base64URL);
    } else {
      sendNotification({ type: "error", message: "File upload error" });
    }
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
                className="btn btn-primary mr-2"
              >
                Reject
              </button>
              <button
                onClick={() => setDisabled(!disabled)}
                className="btn btn-primary"
              >
                {disabled ? "Edit" : "Disable field"}
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

      <form>
        {dData.map(
          (
            {
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
              offline_appointment_time,
              online_appointment_time,
              both_appointment_time,
              college_or_institute,
              completion_year,
              doctor_registration_no,
              experience_year,
              medical_registration_council,
              registration_year,
              profile_image,
              offline_clinic_address,
              offline_first_time_fees,
              offline_normal_fees,
              online_clinic_address,
              online_first_time_fees,
              online_normal_fees,
              street_address,
            },
            i
          ) => {
            return (
              <Fragment>
                {/* STEP 1 */}
                <>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <h5 className="user_heading mb-4">
                        Doctors Dedicated Profile
                      </h5>
                    </div>
                    <div className="col-md-12">
                      <div className="small-12">
                        <div className="circle">
                          <img
                            onClick={() => imageRef.current.elements[0].click()}
                            className="profile-pic"
                            src={
                              // profilePic ||
                              // profile_image ||
                              "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                            }
                            alt="profile-pic"
                          />
                        </div>
                        <div className="p-image">
                          <i className="fa fa-camera upload-button"></i>
                          <input
                            className="file-upload"
                            type="file"
                            name="profile_image"
                            id="profile_image"
                            accept="image/*"
                            {...register("profile_image", {
                              onChange: (e) => handleImagesUpload(e),
                              // value: profile_image,
                              // disabled: disabled
                            })}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="row"> */}
                    {/* doctor_name */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Dr. Name"
                          name="doctor_name"
                          readOnly={disabled}
                          {...register("doctor_name", {
                            required: "Doctor name required",
                            value: doctor_name,
                          })}
                        />
                        {errors.doctor_name && (
                          <p className="text-danger">
                            {errors.doctor_name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* gender */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="male"
                            id="male"
                            readOnly={disabled}
                            {...register("gender", {
                              required: "Gender is required",
                              value: gender,
                            })}
                          />
                          <label className="form-check-label" htmlFor="male">
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            readOnly={disabled}
                            {...register("gender", {
                              required: "Gender is required",
                              value: gender,
                            })}
                          />
                          <label className="form-check-label" htmlFor="female">
                            Female
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="others"
                            value="others"
                            readOnly={disabled}
                            {...register("gender", {
                              required: "Gender is required",
                              value: gender,
                            })}
                          />
                          <label className="form-check-label" htmlFor="others">
                            Others
                          </label>
                        </div>
                      </div>
                      {errors.gender && (
                        <p className="text-danger">{errors.gender.message}</p>
                      )}
                    </div>
                    {/* </div> */}

                    {/* specialization */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <Controller
                          control={control}
                          name="specialization"
                          rules={{ required: "Specialization is required" }}
                          defaultValue={specialization}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <Select
                                onChange={onChange}
                                value={value}
                                isMulti
                                readOnly={disabled}
                                // options={options}
                                selected={true}
                              />
                            );
                          }}
                        />
                        {errors.specialization && (
                          <p className="text-danger">
                            {errors.specialization.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="city"
                          readOnly={disabled}
                          {...register("city", {
                            required: "City is required",
                            value: city,
                          })}
                        >
                          <option value="">Select City</option>
                          {/* {City.map((city, i) => (
                            <option key={i} value={city}>
                              {city}
                            </option>
                          ))} */}
                        </select>
                        {errors.city && (
                          <p className="text-danger">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    {/* about_us */}
                    <div className="col-md-12">
                      <div className="mb-3">
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="About Us"
                          rows="3"
                          name="about_us"
                          readOnly={disabled}
                          {...register("about_us", {
                            required: "About is required",
                            // value: about_us,
                          })}
                        />
                        {errors.about_us && (
                          <p className="text-danger">
                            {errors.about_us.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-12">
                      <h5 className="user_heading mb-4">
                        Medical Registration
                      </h5>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Doctor Registration Number"
                          name="doctor_registration_no"
                          readOnly={disabled}
                          {...register("doctor_registration_no", {
                            required: "Doctor registration number is required",
                            value: doctor_registration_no,
                          })}
                        />
                        {errors.doctor_registration_no && (
                          <p className="text-danger">
                            {errors.doctor_registration_no.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Medical Registration Council"
                          name="medical_registration_council"
                          readOnly={disabled}
                          {...register("medical_registration_council", {
                            required:
                              "Medical registration council is required",
                            value: medical_registration_council,
                          })}
                        />
                        {errors.medical_registration_council && (
                          <p className="text-danger">
                            {errors.medical_registration_council.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Registration Year"
                          name="registration_year"
                          readOnly={disabled}
                          {...register("registration_year", {
                            required: "Registration year is required",
                            value: registration_year,
                          })}
                        />
                        {errors.registration_year && (
                          <p className="text-danger">
                            {errors.registration_year.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-12">
                      <h5 className="user_heading mb-4">
                        Education Qualification
                      </h5>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Degree"
                          name="degree"
                          readOnly={disabled}
                          {...register("degree", {
                            required: "Degree is required",
                            value: degree,
                          })}
                        />
                        {errors.degree && (
                          <p className="text-danger">{errors.degree.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="College or Institute"
                          readOnly={disabled}
                          name="college_or_institute"
                          {...register("college_or_institute", {
                            required: "College or Institute is required",
                            value: college_or_institute,
                          })}
                        />
                        {errors.college_or_institute && (
                          <p className="text-danger">
                            {errors.college_or_institute.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Year Of Completion"
                          name="completion_year"
                          readOnly={disabled}
                          {...register("completion_year", {
                            required: "Completion year is required",
                            value: completion_year,
                          })}
                        />
                        {errors.completion_year && (
                          <p className="text-danger">
                            {errors.completion_year.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Year Of experience
                      "
                          name="experience_year"
                          readOnly={disabled}
                          {...register("experience_year", {
                            required: "experience is required",
                            // value: experience_year,
                          })}
                        />
                        {errors.experience_year && (
                          <p className="text-danger">
                            {errors.experience_year.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-12">
                      <h5 className="user_heading mb-4">
                        Establishment Basic Details
                      </h5>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Establishment name"
                          name="establishment_name"
                          readOnly={disabled}
                          {...register("establishment_name", {
                            required: "Establishment name is required",
                            value: establishment_name,
                          })}
                        />
                        {errors.establishment_name && (
                          <p className="text-danger">
                            {errors.establishment_name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="City"
                          name="establishment_city"
                          readOnly={disabled}
                          {...register("establishment_city", {
                            required: "Establishment city is required",
                            value: establishment_city,
                          })}
                        />
                        {errors.establishment_city && (
                          <p className="text-danger">
                            {errors.establishment_city.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Locality"
                          name="establishment_locality"
                          readOnly={disabled}
                          {...register("establishment_locality", {
                            required: "Establishment locality is required",
                            value: establishment_locality,
                          })}
                        />
                        {errors.establishment_locality && (
                          <p className="text-danger">
                            {errors.establishment_locality.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
                {/* SECOND STEP */}
                <>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Identity Proof" key="1">
                      <Image
                        width={200}
                        src={identity_proof}
                      />
                    </TabPane>
                    <TabPane tab="Establishment Proof" key="2">
                    <Image
                        width={200}
                        src={establishment_proof}
                      />
                    </TabPane>
                    <TabPane tab="Medical Proof" key="3">
                    <Image
                        width={200}
                        src={medical_proof}
                      />
                    </TabPane>
                  </Tabs>
                </>
                {/* THIRD STEP */}
                <Fragment key={i}>
                          <div className="row mb-4">
                            <div className="col-md-12">
                              <h5 className="user_heading mb-4">
                                Map Location
                              </h5>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Phone number"
                                  name="mobile"
                                  readOnly
                                  {...register("mobile", {
                                    value: mobile,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Email Addresses"
                                  name="email"
                                  readOnly
                                  {...register("email", {
                                    value: email,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Street address"
                                  name="street_address"
                                  {...register("street_address", {
                                    required: "Street address is required",
                                    value: street_address,
                                  })}
                                />
                                {errors.street_address && (
                                  <p className="text-danger">
                                    {errors.street_address.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Landmark"
                                  name="landmark"
                                  {...register("landmark", {
                                    required: "Landmark is required",
                                    // value: landmark,
                                  })}
                                />
                                {errors.landmark && (
                                  <p className="text-danger">
                                    {errors.landmark.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="row mb-4">
                              <div className="col-md-12">
                                <h5 className="user_heading mb-4">
                                  Establishment Timings
                                </h5>
                              </div>
                              <div className="col-md-6 col-lg-4"></div>
                            </div>

                            <div className="row mb-4">
                              <div className="col-md-12">
                                {/*  */}
                                <Tabs
                                  id="controlled-tab-example"
                                  // activeKey={key}
                                  // onSelect={(k) => setKey(k)}
                                  className="mb-3"
                                >
                                  {/* Offline */}
                                  <Tabs eventKey="offline" title="Offline">
                                    <div className="row align-items-center">
                                      <div className="col-12 mt-3">
                                        <p>
                                          Appointment Fees (Offline - Clinic
                                          visit)
                                        </p>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <input
                                            name="offline_first_time_fees"
                                            type="text"
                                            className="form-control"
                                            placeholder="First Time Fess"
                                            {...register(
                                              "offline_first_time_fees",
                                              {
                                                required: "Fees required",
                                                value: offline_first_time_fees,
                                              }
                                            )}
                                          />
                                          {errors.offline_first_time_fees && (
                                            <p className="text-danger">
                                              {
                                                errors.offline_first_time_fees
                                                  .message
                                              }
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <input
                                            name="offline_normal_fees"
                                            type="text"
                                            className="form-control"
                                            placeholder="Normal Fess"
                                            {...register(
                                              "offline_normal_fees",
                                              {
                                                required: "Fees is required",
                                                value: offline_normal_fees,
                                              }
                                            )}
                                          />
                                          {errors.offline_normal_fees && (
                                            <p className="text-danger">
                                              {
                                                errors.offline_normal_fees
                                                  .message
                                              }
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <input
                                            name="offline_clinic_address"
                                            type="text"
                                            className="form-control"
                                            placeholder="client Address"
                                            {...register(
                                              "offline_clinic_address",
                                              {
                                                required:
                                                  "Clinic address is required",
                                                value: offline_clinic_address,
                                              }
                                            )}
                                          />
                                          {errors.offline_clinic_address && (
                                            <p className="text-danger">
                                              {
                                                errors.offline_clinic_address
                                                  .message
                                              }
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row align-items-center">
                                      <div className="col-12 mt-3">
                                        <p>Add Timing</p>
                                      </div>
                                      <div className="col-md-4">
                                        <p>Days</p>
                                      </div>
                                      <div className="col-md-4">
                                        <p>Start Time</p>
                                      </div>
                                      <div className="col-md-4">
                                        <p>End Time</p>
                                      </div>
                                    </div>
                                    {/* <Toggle
                                      errors={errors.offline_appointment_time}
                                      register={register}
                                      type="offline"
                                      setValue={setValue}
                                      formData={offline_appointment_time}
                                    /> */}
                                  </Tabs>

                                  {/* Online */}
                                  <Tabs eventKey="online" title="Online">
                                    <div className="row align-items-center">
                                      <div className="col-12 mt-3">
                                        <p>
                                          Appointment Fees (Online - Clinic
                                          visit)
                                        </p>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <input
                                            name="online_first_time_fees"
                                            type="text"
                                            className="form-control"
                                            placeholder="First Time Fess"
                                            {...register(
                                              "online_first_time_fees",
                                              {
                                                required: "Fees is required",
                                                value: online_first_time_fees,
                                              }
                                            )}
                                          />
                                          {errors.online_first_time_fees && (
                                            <p className="text-danger">
                                              {
                                                errors.online_first_time_fees
                                                  .message
                                              }
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <input
                                            name="online_normal_fees"
                                            type="text"
                                            className="form-control"
                                            placeholder="Normal Fess"
                                            {...register("online_normal_fees", {
                                              required: "Fees is required",
                                              value: online_normal_fees,
                                            })}
                                          />
                                          {errors.online_normal_fees && (
                                            <p className="text-danger">
                                              {
                                                errors.online_normal_fees
                                                  .message
                                              }
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <input
                                            name="online_clinic_address"
                                            type="text"
                                            className="form-control"
                                            placeholder="client Address"
                                            {...register(
                                              "online_clinic_address",
                                              {
                                                required:
                                                  "Clinic address is required",
                                                value: online_clinic_address,
                                              }
                                            )}
                                          />
                                          {errors.online_clinic_address && (
                                            <p className="text-danger">
                                              {
                                                errors.online_clinic_address
                                                  .message
                                              }
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row align-items-center">
                                      <div className="col-12 mt-3 mb-2">
                                        <p>Add Timing</p>
                                      </div>
                                      <div className="col-md-4">
                                        <p>Days</p>
                                      </div>
                                      <div className="col-md-4">
                                        <p>Start Time</p>
                                      </div>
                                      <div className="col-md-4">
                                        <p>End Time</p>
                                      </div>
                                    </div>
                                    {/* <Toggle
                                      errors={errors.online_appointment_time}
                                      register={register}
                                      type="online"
                                      setValue={setValue}
                                      formData={online_appointment_time}
                                    /> */}
                                  </Tabs>

                                  {/* Both */}
                                  <Tabs eventKey="both" title="Both">
                                    <div className="row align-items-center">
                                      <div className="col-12 mt-3">
                                        <p>
                                          Appointment Fees (Offline - Clinic
                                          visit)
                                        </p>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="First Time Fess"
                                            name="both_offline_first_time_fees"
                                            {...register(
                                              "both_offline_first_time_fees",
                                              {
                                                required: "Fees required",
                                                value: offline_first_time_fees,
                                              }
                                            )}
                                          />
                                          {errors.both_offline_first_time_fees && (
                                            <p className="text-danger">
                                              {
                                                errors
                                                  .both_offline_first_time_fees
                                                  .message
                                              }
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Normal Fess"
                                            name="both_offline_normal_fees"
                                            {...register(
                                              "both_offline_normal_fees",
                                              {
                                                required: "Fees is required",
                                                value: offline_normal_fees,
                                              }
                                            )}
                                          />
                                          {errors.both_offline_normal_fees && (
                                            <p className="text-danger">
                                              {
                                                errors.both_offline_normal_fees
                                                  .message
                                              }
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row align-items-center">
                                      <div className="col-12 mt-3">
                                        <p>
                                          Appointment Fees (Online - Clinic
                                          visit)
                                        </p>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="First Time Fess"
                                            name="both_online_first_time_fees"
                                            {...register(
                                              "both_online_first_time_fees",
                                              {
                                                required: "Fees is required",
                                                value: online_first_time_fees,
                                              }
                                            )}
                                          />
                                          {errors.both_online_first_time_fees && (
                                            <p className="text-danger">
                                              {
                                                errors
                                                  .both_online_first_time_fees
                                                  .message
                                              }
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Normal Fess"
                                            name="both_online_normal_fees"
                                            {...register(
                                              "both_online_normal_fees",
                                              {
                                                required: "Fees is required",
                                                value: online_normal_fees,
                                              }
                                            )}
                                          />
                                          {errors.both_online_normal_fees && (
                                            <p className="text-danger">
                                              {
                                                errors.both_online_normal_fees
                                                  .message
                                              }
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <input
                                            type="text"
                                            name="both_online_clinic_address"
                                            className="form-control"
                                            placeholder="client Address"
                                            {...register(
                                              "both_online_clinic_address",
                                              {
                                                required:
                                                  "Clinic Address is required",
                                                value: online_clinic_address,
                                              }
                                            )}
                                          />
                                          {errors.both_online_clinic_address && (
                                            <p className="text-danger">
                                              {
                                                errors
                                                  .both_online_clinic_address
                                                  .message
                                              }
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row align-items-center">
                                      <div className="col-12 mt-3 mb-2">
                                        <p>Add Timing</p>
                                      </div>
                                      <div className="col-md-4">
                                        <p>Days</p>
                                      </div>
                                      <div className="col-md-4">
                                        <p>Start Time</p>
                                      </div>
                                      <div className="col-md-4">
                                        <p>End Time</p>
                                      </div>
                                    </div>
                                    {/* <Toggle
                                      errors={errors.both_appointment_time}
                                      register={register}
                                      type="both"
                                      setValue={setValue}
                                      formData={both_appointment_time}
                                    /> */}
                                  </Tabs>
                                </Tabs>
                              </div>
                              <div className="col-md-6 col-lg-4"></div>
                            </div>

                          </div>
                        </Fragment>
              </Fragment>
            );
          }
        )}
      </form>
    </Fragment>
  );
};

export default DoctorDetails;
