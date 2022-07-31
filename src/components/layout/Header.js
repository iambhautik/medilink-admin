import React, { Fragment } from "react";

const Header = () => {
  return (
    <Fragment>
      <div className="app-header__content">
        <div className="app-header-right">
          <div className="header-btn-lg pr-0">
            <div className="widget-content p-0">
              <div className="widget-content-wrapper">
                <div className="widget-content-left">
                  <div className="btn-group">
                    <a
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="p-0 btn"
                    >
                      <img
                        width="42"
                        className="rounded-circle"
                        src="assets/images/avatars/1.jpg"
                        alt=""
                      />
                      <i className="fa fa-angle-down ml-2 opacity-8"></i>
                    </a>
                    <div
                      tabindex="-1"
                      role="menu"
                      aria-hidden="true"
                      className="dropdown-menu dropdown-menu-right"
                    >
                      <button
                        type="button"
                        tabindex="0"
                        className="dropdown-item"
                      >
                        User Account
                      </button>
                      <button
                        type="button"
                        tabindex="0"
                        className="dropdown-item"
                      >
                        Settings
                      </button>
                      <h6 tabindex="-1" className="dropdown-header">
                        Header
                      </h6>
                      <button
                        type="button"
                        tabindex="0"
                        className="dropdown-item"
                      >
                        Actions
                      </button>
                      <div tabindex="-1" className="dropdown-divider"></div>
                      <button
                        type="button"
                        tabindex="0"
                        className="dropdown-item"
                      >
                        Dividers
                      </button>
                    </div>
                  </div>
                </div>
                <div className="widget-content-left  ml-3 header-user-info">
                  <div className="widget-heading">Alina Mclourd</div>
                  <div className="widget-subheading">VP People Manager</div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
