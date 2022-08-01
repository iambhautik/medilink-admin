import React, { Fragment } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../container/actions/login/adminLogin.action";
import Cookie from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { sendNotification } from "../../utils/Utilities";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const onFinish = (values) => {
    dispatch(adminLogin(values)).then((res) => {
      const { payload } = res;
      console.log(payload, "payload")
      if(payload.success){
        const { result } = payload;
        Cookie.set('token', result?.[0].token )
        Cookie.set('id', result?.[0]._id )
        navigate('/doctors')
      } else{
        sendNotification({ type: 'error', message: 'Something went wrong'})
      }
    })
  };
  return (
    <Fragment>
      <div className="d-flex justify-content-center align-content-center align-items-center">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
};

export default Login;
