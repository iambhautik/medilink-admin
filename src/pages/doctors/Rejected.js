import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllDoctors } from "../../container/actions/doctor/getDoctorList.action";
import { Table } from "antd";
import { ThreeDots } from "../../components/common/Icons";
import { useNavigate } from 'react-router-dom'
import { updateDoctorStatus } from "../../container/actions/doctor/updateDoctorStatus.action";
import { sendNotification } from "../../utils/Utilities";

const Rejected = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const doctorListReducer = useSelector((state) => state.doctorListReducer);

  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    dispatch(GetAllDoctors());
  }, []);

  useEffect(() => {
    const { result } = doctorListReducer;
    if (Array.isArray(result)) {
      const pending = result.filter((application) => application.status === 2)
      setDoctorData(pending);
    }
  }, [doctorListReducer]);

  const goToDoctorById = (id, record) => {
    navigate(`/rejectedapp/${id}`, {
      state: record,
      replace: true
    })
  }

  const takeAction = ({status, id}) => {
    dispatch(updateDoctorStatus({data: {status}, id})).then((res) => {
      const { payload } = res;
      if(payload.success){
        sendNotification({type: 'success', message: payload.message })
      } else {
        sendNotification({type: 'error', message: 'Something went wrong'})
      }
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
                class="btn btn-secondary btn-sm"
                onClick={() => goToDoctorById(_id, record)}
              >
                View
              </button>
          </>
        );
      },
    },
  ];

  return (
    <Fragment>
      <h3>Pending for approval</h3>
      <Table columns={columns} dataSource={doctorData} />
    </Fragment>
  );
};

export default Rejected;
