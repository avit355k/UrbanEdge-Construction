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

          <Route path="/admin/dashboard" exact={true} element={
            <RequireAuth >
              <Dashboard />
            </RequireAuth>
          } />
        </Routes>

        <Footer />
      </BrowserRouter>
      <ToastContainer position="top-right" />
    </>
  )
}

export default App;
