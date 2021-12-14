import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/home';
import Resort from './components/resort';
import Header from './components/header/header';
import Auth from './components/auth';
import Admin from './components/admin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from './components/utils/tools';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotifications } from '../src/store/actions/index';
import EditResort from './components/admin/edit';
import CreateResort from './components/admin/create';
import { isAuthUser } from './store/actions/user_actions';
import UpdateProfile from './components/updateProfile';
import SuperAdmin from './components/superAdmin';
import AccountVerify from './components/auth/verification';

const RouteTree = () => {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notifications && notifications.success) {
      const msg = notifications.msg ? notifications.msg : 'Success';
      showToast('SUCCESS', msg);
      dispatch(clearNotifications());
    } else if (notifications && notifications.error) {
      const msg = notifications.msg ? notifications.msg : 'Error';
      showToast('ERROR', msg);
      dispatch(clearNotifications());
    }
  }, [notifications, dispatch]);

  useEffect(() => {
    dispatch(isAuthUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/resort/:id' element={<Resort />} />
        <Route path='/admin/createResort' element={<CreateResort />} />
        <Route path='/admin/:id' element={<EditResort />} />
        <Route path='/auth/update' element={<UpdateProfile />} />
        <Route path='/superAdmin' element={<SuperAdmin />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/verification/:token' element={<AccountVerify />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteTree;
