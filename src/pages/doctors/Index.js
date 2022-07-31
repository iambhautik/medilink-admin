import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllDoctors } from "../../container/actions/getDoctorList.action";
import { Table } from "antd";
import { ThreeDots } from "../../components/common/Icons";
import { useNavigate } from 'react-router-dom'

const Doctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const doctorListReducer = useSelector((state) => state.doctorListReducer);

  const [doctorData, setDoctorData] = useState([]);

  console.log(doctorData, "doctorData");

  useEffect(() => {
    dispatch(GetAllDoctors());
  }, []);

  useEffect(() => {
    const { result } = doctorListReducer;
    if (Array.isArray(result)) {
      setDoctorData(result);
    }
  }, [doctorListReducer]);

  const goToDoctorById = (id, record) => {
    navigate(`/doctor/${id}`, {
      state: record,
      replace: true
    })
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const { doctor_name } = record;
        return <>{doctor_name}</>;
      },
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text, record) => {
        return <>{record?.username}</>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => {
        return <>{record?.email}</>;
      },
    },
    {
      title: "Mobile No.",
      dataIndex: "mobile",
      key: "mobile",
      render: (text, record) => {
        return <>{record?.mobile}</>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        const { _id } = record;
        return (
          <>
            {/* <div class="btn-group"> */}
              <button
                type="button"
                class="btn btn-secondary btn-sm dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <ThreeDots />
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <button onClick={() => goToDoctorById(_id, record)} class="dropdown-item" type="button">
                  Edit
                </button>
              </div>
            {/* </div> */}
          </>
        );
      },
    },
  ];

  return (
    <Fragment>
      <h1>Doctors</h1>
      <Table columns={columns} dataSource={doctorData} />
    </Fragment>
  );
};

export default Doctors;
