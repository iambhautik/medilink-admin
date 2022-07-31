import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from "../components/layout/MainLayout";
import DoctorById from "../pages/doctors/DoctorById";
import Doctors from "../pages/doctors/Index";

const AppRoutes = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />} >
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/doctor/:dId' element={<DoctorById />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default AppRoutes;
