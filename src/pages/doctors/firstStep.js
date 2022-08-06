import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SmallLoader from "../../../components/common/smallLoader";
import Navbar from "../../../components/layout/Navbar";
import { GetDoctorProfile } from "../../../redux/actions/doctor/getDoctorDetails.action";
import { UpdateDoctorProfile } from "../../../redux/actions/doctor/registerDoctor.action";
import {
  handleImageUpload,
  isValidArray,
  sendNotification,
} from "../../../utils/utilities";
import Select from "react-select";
import City from "../../../utils/city.json";
import { FILE_SIZE_EXISED } from "../../../assets/constants/messages";
import { useForm, Controller } from "react-hook-form";

const DoctorProfile = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const imageRef = useRef();
  const getDoctorProfileReducer = useSelector(
    (state) => state.getDoctorProfileReducer
  );

  const [profilePic, setProfilePic] = useState("");
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserDataLoadin, setIsUserDataLoading] = useState(
    getDoctorProfileReducer.isLoading
  );

  
  useEffect(() => {
    dispatch(GetDoctorProfile()).then(() => setIsUserDataLoading(false));
  }, [dispatch]);
  
  useEffect(() => {
    const { result } = getDoctorProfileReducer;
    if (isValidArray(result)) {
      setFormData(() => result);
    }
  }, [getDoctorProfileReducer]);
  
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      specialization: formData?.[0]?.specialization,
    },
  });
  
  const handleUserSubmit = (data) => {
    setIsLoading(true);
    console.log(data, "data");

    dispatch(UpdateDoctorProfile(data)).then((d) => {
      setIsLoading(false);
      navigate("/second-step");
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
      sendNotification({ type: "error", message: FILE_SIZE_EXISED });
    }
  };

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

  return (
    <Fragment>
      <Navbar />
      <div className="dr_wrapper">
        <div className="container-lg">
          <div className="row">
            <div className="col-md-12">
              <h2 className="user_heading mb-4">Profile Details</h2>
            </div>
          </div>
          {isUserDataLoadin ? (
            <>
              <div className="text-center">
                <SmallLoader style={{ width: "2rem", height: "2rem" }} />
              </div>
            </>
          ) : (
            <div className="shadow p-3 p-lg-4 br-5">
              <form ref={imageRef} onSubmit={handleSubmit(handleUserSubmit)}>
                {formData.map(
                  (
                    {
                      about_us,
                      gender,
                      specialization,
                      city,
                      doctor_name,
                      doctor_registration_no,
                      college_or_institute,
                      completion_year,
                      medical_registration_council,
                      registration_year,
                      degree,
                      experience_year,
                      establishment_name,
                      establishment_city,
                      establishment_locality,
                      profile_image,
                    },
                    i
                  ) => {
                    return (
                      <Fragment key={i}>
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
                                    onClick={() =>
                                      imageRef.current.elements[0].click()
                                    }
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
                                    {...register("gender", {
                                      required: "Gender is required",
                                      value: gender,
                                    })}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="male"
                                  >
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
                                    {...register("gender", {
                                      required: "Gender is required",
                                      value: gender,
                                    })}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="female"
                                  >
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
                                    {...register("gender", {
                                      required: "Gender is required",
                                      value: gender,
                                    })}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="others"
                                  >
                                    Others
                                  </label>
                                </div>
                              </div>
                              {errors.gender && (
                                <p className="text-danger">
                                  {errors.gender.message}
                                </p>
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
                                        options={options}
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
                                  <p className="text-danger">
                                    {errors.city.message}
                                  </p>
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
                                  name="doctor_registration_no"
                                  {...register("doctor_registration_no", {
                                    required:
                                      "Doctor registration number is required",
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
                                  {...register("medical_registration_council", {
                                    required:
                                      "Medical registration council is required",
                                    value: medical_registration_council,
                                  })}
                                />
                                {errors.medical_registration_council && (
                                  <p className="text-danger">
                                    {
                                      errors.medical_registration_council
                                        .message
                                    }
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
                                  {...register("degree", {
                                    required: "Degree is required",
                                    value: degree,
                                  })}
                                />
                                {errors.degree && (
                                  <p className="text-danger">
                                    {errors.degree.message}
                                  </p>
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
                                  {...register("college_or_institute", {
                                    required:
                                      "College or Institute is required",
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
                                  {...register("establishment_locality", {
                                    required:
                                      "Establishment locality is required",
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

                          <div className="row">
                            <div className="col-12 text-center">
                              <button type="submit" className="btn btn-primary">
                                {isLoading ? <SmallLoader /> : "Next Step"}
                              </button>
                            </div>
                          </div>
                        </>
                      </Fragment>
                    );
                  }
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default DoctorProfile;
