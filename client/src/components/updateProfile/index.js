import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserById } from '../../store/actions/user_actions';
import './updateProfile.css';
import { validation, formValues } from './validationSchema';
import { useFormik } from 'formik';
import { TextField, Button } from '@material-ui/core';
import { updateUser } from '../../store/actions/user_actions';

const UpdateProfile = () => {
  let users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [userData, setUserData] = useState(formValues);

  useEffect(() => {
    if (users && users.data && !users.currentUser) {
      dispatch(getUserById(users.data._id));
    }
  }, [users, dispatch]);

  useEffect(() => {
    if (users && users.data) {
      checkStatus();
    }
    if (users && users.currentUser) {
      checkUserLoaded();
    }
  }, [users]);

  const checkStatus = () => {
    if (users.data._id) {
      setLoggedIn(true);
    }
  };

  const checkUserLoaded = () => {
    if (users.currentUser) {
      userData.email = users.currentUser.user.email;
      userData.username = users.currentUser.user.username;
      setLoaded(true);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: userData,
    validationSchema: validation,
    onSubmit: (values) => {
      values.id = users.currentUser.user._id;
      dispatch(updateUser(values));
    },
  });

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : null,
  });

  return (
    <div className='updateProfileWrapper'>
      {loggedIn && loaded ? (
        <>
          <form onSubmit={formik.handleSubmit}>
            {' '}
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='email'
                variant='outlined'
                label='email'
                {...formik.getFieldProps('email')}
                {...errorHelper(formik, 'email')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='username'
                variant='outlined'
                label='username'
                {...formik.getFieldProps('username')}
                {...errorHelper(formik, 'username')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='oldPassword'
                variant='outlined'
                label='Old Password'
                {...formik.getFieldProps('oldPassword')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='newPassword'
                variant='outlined'
                label='New Password'
                {...formik.getFieldProps('newPassword')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='confirmPassword'
                variant='outlined'
                label='Confirm Password'
                {...formik.getFieldProps('confirmPassword')}
              />
            </div>
            <br />
            <Button variant='contained' color='primary' type='submit'>
              Save Changes
            </Button>
          </form>
        </>
      ) : (
        <div>def not sup</div>
      )}{' '}
    </div>
  );
};

export default UpdateProfile;
