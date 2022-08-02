import { Avatar } from "antd";
import React, { Fragment } from "react";
import { UserOutlined } from "@ant-design/icons";
import jsCookie from "js-cookie";
import { useNavigate } from "react-router-dom";
const Header = () => {

  const navigate = useNavigate();

  const logoutAdmin = (e) => {
    console.log(e)
    jsCookie.remove();
    navigate('/login')

  }

  return (
    <Fragment>
      <div className="app-header__content">
        <div className="app-header-right">
          <div className="header-btn-lg pr-0">
            <div className="widget-content p-0">
              <div className="widget-content-wrapper">
                <div className="widget-content-left  ml-3 header-user-info">
                  <Avatar
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    size="large"
                    icon={<UserOutlined />}
                  />
                  <div className="dropdown-menu dropdown-menu-right">
                    <button className="dropdown-item">Profile</button>
                    <button className="dropdown-item" onClick={(e) => logoutAdmin(e)}>Logout</button>
                    {/* <div class="dropdown-item">
                      Profile
                    </div>
                    <div class="dropdown-item">
                      <p onClick={logoutAdmin} className="m-0">
                      Logout
                      </p>
                    </div> */}
                  </div>
                  {/* <div className="widget-heading">Alina Mclourd</div>
                  <div className="widget-subheading">VP People Manager</div> */}
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
