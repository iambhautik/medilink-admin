import React, { Fragment } from "react";
import { DoctorIcon } from "../common/Icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Fragment>
      <div>
        <div
          class="d-flex flex-column flex-shrink-0 p-3 navbar-dark bg-dark"
          style={{width: '230px', height:'100vh'}}
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
                <Link to='/doctors' class="nav-link active" aria-current="page">
                  Home
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
                <a class="dropdown-item" href="#">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
