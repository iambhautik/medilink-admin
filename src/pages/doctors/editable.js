import React, { Fragment, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import City from "../../utils/city.json";
import {
  handleImageUpload,
  sendNotification,
} from "../../utils/Utilities";
import { Tab, Tabs } from "react-bootstrap";
import Toggle from "../../components/common/toggle";
import SmallLoader from "../../components/common/SmallLoader";
import { Image } from "antd";
import { useDispatch } from "react-redux";
import { updateDoctorDetails } from "../../container/actions/doctor/updateDoctorDetails.action";
import { useParams } from "react-router-dom";

const Editable = ({ doctorData, toggleInput }) => {
  const imageRef = useRef();
  const dispatch = useDispatch()
  const {dId} = useParams()

  const [profilePic, setProfilePic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    setValue,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm();

  const options = [
    { value: "1", label: "Gastrologist" },
    { value: "2", label: "General" },
    { value: "3", label: "Gynecologist" },
    { value: "4", label: "Pediatrician" },
    { value: "5", label: "Homeopathic" },
    { value: "6", label: "Neurologists" },
    { value: "7", label: "Dentist" },
    { value: "8", label: "Orthopaedic" },
  ];

  const handleImagesUpload = async (e) => {
    let size = e?.target?.files[0]?.size;

    if (size < 700000) {
      let name = e.target.name;
      let base64URL = await handleImageUpload(e, name);
      setProfilePic(() => base64URL);
      setValue("profile_image", base64URL);
    } else {
      sendNotification({ type: "error", message: "Something went wrong" });
    }
  };

  const updateDoctorData = (data) => {
    console.log(data);
    dispatch(updateDoctorDetails({data, id : dId })).then((res) => {
      const { payload: {success} } = res;
      if(success){
        sendNotification({type : "success", message: "Profile Updated"})
      } else {
        sendNotification({type : "error", message: "Something went wrong"})
      }

    })
  };

  return (
    <Fragment>
      <form ref={imageRef} onSubmit={handleSubmit(updateDoctorData)}>
        {doctorData.map(
          (
            {
              gender,
              profile_image,
              doctor_name,
              specialization,
              city,
              about_us,
              doctor_registration_no,
              medical_registration_council,
              registration_year,
              degree,
              college_or_institute,
              completion_year,
              experience_year,
              establishment_name,
              establishment_city,
              establishment_locality,
              mobile,
              email,
              street_address,
              landmark,
              offline_first_time_fees,
              offline_normal_fees,
              offline_clinic_address,
              online_first_time_fees,
              online_normal_fees,
              online_clinic_address,
              both_appointment_time,
              offline_appointment_time,
              online_appointment_time,
              identity_proof,
              medical_proof,
              establishment_proof
            },
            i
          ) => {
            return (
              <>
                {/* first step */}
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
                              profilePic ||
                              profile_image ||
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
                            disabled
                            {...register("profile_image", {
                              onChange: (e) => handleImagesUpload(e),
                              value: profile_image,
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
                          disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                          disabled
                          render={({ field: { onChange, value } }) => {
                            return (
                              <Select
                                onChange={onChange}
                                value={value}
                                isMulti
                                options={options}
                                selected={true}
                                isDisabled={toggleInput}
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
                          disabled
                          {...register("city", {
                            required: "City is required",
                            value: city,
                          })}
                        >
                          <option value="">Select City</option>
                          {City.map((city, i) => (
                            <option key={i} value={city}>
                              {city}
                            </option>
                          ))}
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
                          disabled
                          {...register("about_us", {
                            required: "About is required",
                            value: about_us,
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
                          disabled
                          name="doctor_registration_no"
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
                          disabled
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
                          disabled
                          name="registration_year"
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
                          disabled
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
                          name="college_or_institute"
                          disabled
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
                          disabled
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
                          placeholder="Year Of experience"
                          disabled
                          name="experience_year"
                          {...register("experience_year", {
                            required: "experience is required",
                            value: experience_year,
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
                          disabled
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
                          disabled
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
                          disabled
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
                {/* second step */}
                <>
                  <h4>Documents</h4>
                  <Tabs>
                    <Tab eventKey="identity" title="Identity Proof">
                      <Image
                        width={200}
                        src={identity_proof}
                      />
                    </Tab>
                    <Tab eventKey="medical" title="Medical Proof">
                      <Image
                        width={200}
                        src={medical_proof}
                      />
                    </Tab>
                    <Tab eventKey="establishment" title="Establishment Proof">
                      <Image
                        width={200}
                        src={establishment_proof}
                      />
                    </Tab>
                  </Tabs>
                </>
                {/* third step */}
                <>
                  <div className="row my-4">
                    <div className="col-md-12">
                      <h5 className="user_heading mb-4">Map Location</h5>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Phone number"
                          name="mobile"
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
                          name="landmark"
                          {...register("landmark", {
                            required: "Landmark is required",
                            value: landmark,
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
                          <Tab eventKey="offline" title="Offline">
                            <div className="row align-items-center">
                              <div className="col-12 mt-3">
                                <p>Appointment Fees (Offline - Clinic visit)</p>
                              </div>
                              <div className="col-md-4">
                                <div className="mb-3">
                                  <input
                                    name="offline_first_time_fees"
                                    type="text"
                                    className="form-control"
                                    placeholder="First Time Fess"
                                    disabled
                                    {...register("offline_first_time_fees", {
                                      required: "Fees required",
                                      value: offline_first_time_fees,
                                    })}
                                  />
                                  {errors.offline_first_time_fees && (
                                    <p className="text-danger">
                                      {errors.offline_first_time_fees.message}
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
                                    disabled
                                    {...register("offline_normal_fees", {
                                      required: "Fees is required",
                                      value: offline_normal_fees,
                                    })}
                                  />
                                  {errors.offline_normal_fees && (
                                    <p className="text-danger">
                                      {errors.offline_normal_fees.message}
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
                                    disabled
                                    {...register("offline_clinic_address", {
                                      required: "Clinic address is required",
                                      value: offline_clinic_address,
                                    })}
                                  />
                                  {errors.offline_clinic_address && (
                                    <p className="text-danger">
                                      {errors.offline_clinic_address.message}
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
                            <Toggle
                              errors={errors.offline_appointment_time}
                              register={register}
                              type="offline"
                              setValue={setValue}
                              formData={offline_appointment_time}
                            />
                          </Tab>

                          {/* Online */}
                          <Tab eventKey="online" title="Online">
                            <div className="row align-items-center">
                              <div className="col-12 mt-3">
                                <p>Appointment Fees (Online - Clinic visit)</p>
                              </div>
                              <div className="col-md-4">
                                <div className="mb-3">
                                  <input
                                    name="online_first_time_fees"
                                    type="text"
                                    className="form-control"
                                    placeholder="First Time Fess"
                                    disabled
                                    {...register("online_first_time_fees", {
                                      required: "Fees is required",
                                      value: online_first_time_fees,
                                    })}
                                  />
                                  {errors.online_first_time_fees && (
                                    <p className="text-danger">
                                      {errors.online_first_time_fees.message}
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
                                    disabled
                                    {...register("online_normal_fees", {
                                      required: "Fees is required",
                                      value: online_normal_fees,
                                    })}
                                  />
                                  {errors.online_normal_fees && (
                                    <p className="text-danger">
                                      {errors.online_normal_fees.message}
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
                                    disabled
                                    {...register("online_clinic_address", {
                                      required: "Clinic address is required",
                                      value: online_clinic_address,
                                    })}
                                  />
                                  {errors.online_clinic_address && (
                                    <p className="text-danger">
                                      {errors.online_clinic_address.message}
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
                            <Toggle
                              errors={errors.online_appointment_time}
                              register={register}
                              type="online"
                              setValue={setValue}
                              formData={online_appointment_time}
                            />
                          </Tab>

                          {/* Both */}
                          <Tab eventKey="both" title="Both">
                            <div className="row align-items-center">
                              <div className="col-12 mt-3">
                                <p>Appointment Fees (Offline - Clinic visit)</p>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First Time Fess"
                                    name="both_offline_first_time_fees"
                                    disabled
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
                                        errors.both_offline_first_time_fees
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
                                    disabled
                                    {...register("both_offline_normal_fees", {
                                      required: "Fees is required",
                                      value: offline_normal_fees,
                                    })}
                                  />
                                  {errors.both_offline_normal_fees && (
                                    <p className="text-danger">
                                      {errors.both_offline_normal_fees.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="row align-items-center">
                              <div className="col-12 mt-3">
                                <p>Appointment Fees (Online - Clinic visit)</p>
                              </div>
                              <div className="col-md-4">
                                <div className="mb-3">
                                  <input
                                    disabled
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
                                        errors.both_online_first_time_fees
                                          .message
                                      }
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="mb-3">
                                  <input
                                    disabled
                                    type="text"
                                    className="form-control"
                                    placeholder="Normal Fess"
                                    name="both_online_normal_fees"
                                    {...register("both_online_normal_fees", {
                                      required: "Fees is required",
                                      value: online_normal_fees,
                                    })}
                                  />
                                  {errors.both_online_normal_fees && (
                                    <p className="text-danger">
                                      {errors.both_online_normal_fees.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="mb-3">
                                  <input
                                    disabled
                                    type="text"
                                    name="both_online_clinic_address"
                                    className="form-control"
                                    placeholder="client Address"
                                    {...register("both_online_clinic_address", {
                                      required: "Clinic Address is required",
                                      value: online_clinic_address,
                                    })}
                                  />
                                  {errors.both_online_clinic_address && (
                                    <p className="text-danger">
                                      {
                                        errors.both_online_clinic_address
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
                            <Toggle
                              errors={errors.both_appointment_time}
                              register={register}
                              type="both"
                              setValue={setValue}
                              formData={both_appointment_time}
                            />
                          </Tab>
                        </Tabs>
                      </div>
                      <div className="col-md-6 col-lg-4"></div>
                    </div>
                    {!toggleInput && (
                      <div className="row">
                        <div className="col-12 text-center">
                          <button
                            type="submit"
                            className="btn btn-primary me-2 me-md-4"
                          >
                            {isLoading ? <SmallLoader /> : "Update Profile"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              </>
            );
          }
        )}
      </form>
    </Fragment>
  );
};

export default Editable;
