import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validation, formValues } from './resortVS';
import { useFormik } from 'formik';
import { TextField, Button, FormHelperText } from '@material-ui/core';
import WYSIWYG from '../utils/wysiwyg';
import { createResort } from '../../store/actions/resort_actions';

const Create = () => {
  let notifications = useSelector((state) => state.notifications);
  let users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [editorBlur, setEditorBlur] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      let userId = { userId: users.data._id };
      let result = Object.assign(values, userId);
      console.log(result);
      dispatch(createResort(result));
    },
  });

  const handleEditorState = (state) => {
    formik.setFieldValue('description', state, true);
  };

  const handleEditorBlur = (blur) => {
    setEditorBlur(true);
  };

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : null,
  });

  useEffect(() => {
    if (notifications && notifications.success) {
      navigate(`/`);
    }
  });

  useEffect(() => {
    if (users && users.data) {
      checkStatus();
    }
  }, [users]);

  const checkStatus = () => {
    if (users.data.role === 'admin' || users.data.role === 'superAdmin') {
      setIsAdmin(true);
    }
  };

  return (
    <div>
      {isAdmin ? (
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='name'
                label='name'
                variant='outlined'
                {...formik.getFieldProps('name')}
                {...errorHelper(formik, 'name')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='email'
                label='email'
                variant='outlined'
                {...formik.getFieldProps('email')}
                {...errorHelper(formik, 'email')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='phone'
                label='phone'
                variant='outlined'
                {...formik.getFieldProps('phone')}
                {...errorHelper(formik, 'phone')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='address'
                label='address'
                variant='outlined'
                {...formik.getFieldProps('address')}
                {...errorHelper(formik, 'address')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='city'
                variant='outlined'
                label='city'
                {...formik.getFieldProps('city')}
                {...errorHelper(formik, 'city')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='state'
                variant='outlined'
                label='state'
                {...formik.getFieldProps('state')}
                {...errorHelper(formik, 'state')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='postalCode'
                variant='outlined'
                label='postal code'
                {...formik.getFieldProps('postalCode')}
                {...errorHelper(formik, 'postalCode')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='website'
                variant='outlined'
                label='website'
                {...formik.getFieldProps('website')}
                {...errorHelper(formik, 'website')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='longitude'
                type='number'
                variant='outlined'
                label='longitude'
                {...formik.getFieldProps('longitude')}
                {...errorHelper(formik, 'longitude')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='latitude'
                label='latitude'
                type='number'
                variant='outlined'
                {...formik.getFieldProps('latitude')}
                {...errorHelper(formik, 'latitude')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='runs'
                type='number'
                label='runs'
                variant='outlined'
                {...formik.getFieldProps('runs')}
                {...errorHelper(formik, 'runs')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='lifts'
                type='number'
                label='lifts'
                variant='outlined'
                {...formik.getFieldProps('lifts')}
                {...errorHelper(formik, 'lifts')}
              />
            </div>

            <div className='mt-3'>
              <WYSIWYG
                setEditorState={(state) => handleEditorState(state)}
                setEditorBlur={(blur) => handleEditorBlur(blur)}
              />

              {formik.errors.description && editorBlur ? (
                <FormHelperText error={true}>
                  {formik.errors.description}
                </FormHelperText>
              ) : null}

              <TextField
                name='description'
                type='hidden'
                {...formik.getFieldProps('description')}
              />
            </div>

            <Button variant='contained' color='primary' type='submit'>
              Create Resort
            </Button>
          </form>
        </div>
      ) : (
        <div>Either you don't have access to this or I suck at coding</div>
      )}
    </div>
  );
};

export default Create;
