import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from "../components/layout/MainLayout";
import DoctorById from "../pages/doctors/DoctorById";
import Doctors from "../pages/doctors/Index";
import Login from "../pages/login";
import ProtectedRoutes from "./protectedRoutes";
import PublicRoutes from "./publicRoutes";

const AppRoutes = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
          <Route path='/' element={<ProtectedRoutes><MainLayout /></ProtectedRoutes>} >
            <Route path='/doctors' element={<ProtectedRoutes><Doctors /></ProtectedRoutes>} />
            <Route path='/doctor/:dId' element={<ProtectedRoutes><DoctorById /></ProtectedRoutes>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default AppRoutes;
