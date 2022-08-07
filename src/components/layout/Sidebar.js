import React, { Fragment, useEffect, useState } from "react";
import { DoctorIcon } from "../common/Icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getClassName = (currentTab) => {
    if(pathname.split("/").includes(currentTab)){
      return 'active'
    }
    return ''
  }
  return (
    <Fragment>
      <div>
        <div
          class="d-flex flex-column flex-shrink-0 p-3 navbar-dark bg-dark"
          style={{ width: "230px", height: "100vh" }}
        >
          <a
            href="/"
            class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-light text-decoration-none"
          >
            <span class="fs-4">Medilinkz</span>
          </a>
          <hr />
          <div class="scroll_bar">
            <ul class="nav nav-pills flex-column mb-auto">
              <li class="nav-item">
                <Link
                  to="/doctors"
                  class={`nav-link text-white ${
                    getClassName('doctors')
                  }`}
                  aria-current="page"
                >
                  All application
                </Link>
              </li>
              <li class="nav-item mt-3">
                <Link
                  to="/pendingapp"
                  class={`nav-link text-white ${
                    getClassName('pendingapp')
                  }`}
                  aria-current="page"
                >
                  Pending for approval
                </Link>
              </li>
              <li class="nav-item mt-3">
                <Link
                  to="/approved"
                  class={`nav-link text-white ${
                    getClassName('approved')
                  }`}
                  aria-current="page"
                >
                  Approved
                </Link>
              </li>
              <li class="nav-item mt-3">
                <Link
                  to="/rejectedapp"
                  class={`nav-link text-white ${
                    getClassName('rejectedapp')
                  }`}
                  aria-current="page"
                >
                  Rejected
                </Link>
              </li>
            </ul>
          </div>
          <hr />
          <div class="dropdown">
            <a
              href="#"
              class="d-flex align-items-center link-light text-decoration-none dropdown-toggle"
              id="dropdownUser2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt=""
                width="32"
                height="32"
                class="rounded-circle me-2"
              />
              <strong>Admin</strong>
            </a>
            <ul
              class="dropdown-menu text-small shadow"
              aria-labelledby="dropdownUser2"
            >
              <li>
                <a class="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <Button onClick={() => logout()} type="text">
                  Text Button
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
