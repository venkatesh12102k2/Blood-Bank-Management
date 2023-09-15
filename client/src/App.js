import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import PublicRoutes from './components/Routes/PublicRoutes';
import Donar from './pages/Dashboard/Donar';
import Hospitals from './pages/Dashboard/Hospitals';
import Organisations from './pages/Dashboard/Organisations';
import Consumers from './pages/Dashboard/Consumers';
import Donation from './pages/Dashboard/Donation';
import Analytics from './pages/Dashboard/Analytics';
import DonarList from './pages/Admin/DonarList';
import HospitalList from './pages/Admin/HospitalList';
import OrgList from './pages/Admin/OrgList';
import AdminHome from './pages/Admin/AdminHome';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
        } />
        <Route path='/login' element={
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        } />
        <Route path='/register' element={
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        } />
        <Route path='/donar' element={
          <ProtectedRoutes>
            <Donar />
          </ProtectedRoutes>
        } />
        <Route path='/hospital' element={
          <ProtectedRoutes>
            <Hospitals />
          </ProtectedRoutes>
        } />
        <Route path='/organisation' element={
          <ProtectedRoutes>
            <Organisations />
          </ProtectedRoutes>
        } />
        <Route path='/consumer' element={
          <ProtectedRoutes>
            <Consumers />
          </ProtectedRoutes>
        } />
        <Route path='/donation' element={
          <ProtectedRoutes>
            <Donation />
          </ProtectedRoutes>
        } />
        <Route path='/analytics' element={
          <ProtectedRoutes>
            <Analytics />
          </ProtectedRoutes>
        } />
        <Route path='/donar-list' element={
          <ProtectedRoutes>
            <DonarList />
          </ProtectedRoutes>
        } />
        <Route path='/hospital-list' element={
          <ProtectedRoutes>
            <HospitalList />
          </ProtectedRoutes>
        } />
        <Route path='/org-list' element={
          <ProtectedRoutes>
            <OrgList />
          </ProtectedRoutes>
        } />
        <Route path='/admin-home' element={
          <ProtectedRoutes>
            <AdminHome />
          </ProtectedRoutes>
        } />
      </Routes>
    </div>
  );
}

export default App;
