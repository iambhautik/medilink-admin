import React, { Fragment } from "react";
import { DoctorIcon } from "../common/Icons";
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <Fragment>
      <div className="scrollbar-sidebar">
        <div className="app-sidebar__inner">
          <ul className="vertical-nav-menu">
            <li className="app-sidebar__heading">Dashboards</li>
            <li>
              <Link to='/doctors' className="mm-active">
                {/* <i className="metismenu-icon pe-7s-rocket"></i> */}
                <DoctorIcon />
                Doctors
              </Link>
            </li>
            {/* <li className="app-sidebar__heading">UI Components</li>
            <li>
              <a href="#">
                <i className="metismenu-icon pe-7s-diamond"></i>
                Elements
                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
              </a>
              <ul>
                <li>
                  <a href="elements-buttons-standard.html">
                    <i className="metismenu-icon"></i>
                    Buttons
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
