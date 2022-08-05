import React, { Fragment, useState } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <Fragment>
      <div class="d-flex">
        <Sidebar />
        <div class="w-100">
          <Navbar />
          <div class="scroll_bar1">
            <section class="slider_wrapper p-4">
              <div>
                <Outlet />
              </div>
            </section>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MainLayout;
