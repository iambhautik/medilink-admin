import React, { Fragment } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../container/actions/login/adminLogin.action";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { sendNotification } from "../../utils/Utilities";
import { useForm } from "react-hook-form";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: {errors} } = useForm()

  const onFinish = (values) => {
    console.log(values, "values")
    dispatch(adminLogin(values)).then((res) => {
      const { payload } = res;
      console.log(payload, "payload");
      if (payload.success) {
        const { result } = payload;
        Cookie.set("token", result?.[0].token);
        Cookie.set("id", result?.[0]._id);
        navigate("/doctors");
      } else {
        sendNotification({ type: "error", message: "Something went wrong" });
      }
    });
  };
  return (
    <Fragment>
        <div className="container-fluid h-100 d-flex justify-content-center align-content-center align-items-center">
          <form onSubmit={handleSubmit(onFinish)}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                {...register('email', {
                  required: 'Email is required'
                })}
              />
              <p className="text-danger">{errors?.email?.message}</p>
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="password"
                {...register('password', {
                  required: 'Password is required'
                })}
              />
              <p className="text-danger">{errors?.password?.message}</p>
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
    </Fragment>
  );
};

export default Login;
