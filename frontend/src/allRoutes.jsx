import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import CreateForm from './Components/CreateForm';
import FormSubmissions from './Components/FormSubmissions';
import FormDetails from './Components/FormDetails';
import FormInteraction from './Components/FormInteraction';
import Layout from './Layout'; // Import the Layout component
import HomePage from './Components/HomePage';
import HomeLayout from './HomeLayout';
const AllRoutes = ({ setToken, token }) => {
  return (
    <Routes>
      {/* Wrap all routes inside the Layout component */}
      <Route path='/' element={<HomeLayout><HomePage/></HomeLayout>}/>
      <Route path="/login" element={<HomeLayout><Login setToken={setToken} /></HomeLayout>} />
      <Route path="/register" element={<HomeLayout><Register setToken={setToken} /></HomeLayout>} />
      <Route path="/dashboard" element={<Layout><Dashboard token={token} /></Layout>} />
      <Route path="/create-form" element={<Layout><CreateForm token={token} /></Layout>} />
      <Route path="/forms/:formId/details" element={<Layout><FormDetails token={token} /></Layout>} />
      <Route path="/forms/:formId/submissions" element={<Layout><FormSubmissions token={token} /></Layout>} />
      <Route path="/form/:formId" element={<FormInteraction token={token} />} />
    </Routes>
  );
};

export default AllRoutes;
