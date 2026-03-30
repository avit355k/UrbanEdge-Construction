import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Home/Home';
import About from './Pages/About/About.jsx';
import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/Footer/Footer.jsx';
import ServicePage from './Pages/ServicePage/ServicePage.jsx';
import ProjectPage from './Pages/ProjectPage/ProjectPage.jsx';
import BlogPage from './Pages/BlogPage/BlogPage.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import Login from './Component/Admin/Login.jsx';
import Dashboard from './Component/Admin/Dashboard.jsx';
import RequireAuth from './Component/RequireAuth/RequireAuth.jsx';
import ShowService from './Component/Admin/Services/ShowService.jsx';
import AdminLayout from './Component/Admin/AdminLayout.jsx';
import CreateService from './Component/Admin/Services/CreateService.jsx';


function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' exact={true} element={<Home />} />
          <Route path="/about" exact={true} element={<About />} />
          <Route path="/services" exact={true} element={<ServicePage />} />
          <Route path="/projects" exact={true} element={<ProjectPage />} />
          <Route path="/blogs" exact={true} element={<BlogPage />} />
          <Route path="/contacts" exact={true} element={<Contact />} />
          <Route path="/admin/login" exact={true} element={<Login />} />

          <Route path="/admin" exact={true} element={
            <RequireAuth >
              <AdminLayout />
            </RequireAuth>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="services" element={<ShowService />} />
            <Route path="services/create" element={<CreateService />} />
          </Route>
          
        </Routes>

        <Footer />
      </BrowserRouter>
      <ToastContainer position="top-right" />
    </>
  )
}

export default App;
