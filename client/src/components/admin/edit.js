import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getResortById } from '../../store/actions/resort_actions';
import { clearResortList } from '../../store/actions';
import { useParams } from 'react-router-dom';
import { validation, formValues } from './resortVS';
import { useFormik } from 'formik';
import { TextField, Button, FormHelperText } from '@material-ui/core';
import WYSIWYG from '../utils/wysiwyg';
import { updateResort, deleteResort } from '../../store/actions/resort_actions';
import './adminEdit.css';

const Edit = () => {
  let resorts = useSelector((state) => state.resorts);
  let users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [resortData, setResortData] = useState(formValues);
  const [editorBlur, setEditorBlur] = useState(false);
  const [editDescription, setEditDescription] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (resorts && !resorts.resort) {
      dispatch(getResortById(id));
      dispatch(clearResortList());
    }
  }, [dispatch]);

  useEffect(() => {
    if (resorts.resort) {
      setResortData(resorts.resort);
      setEditDescription(resorts.resort.description);
      setLoaded(true);
    }
  }, [resorts.resort]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: resortData,
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      dispatch(updateResort(values));
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

  const handleDelete = () => {
    dispatch(deleteResort(id));
    console.log('here');
  };

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
    <div className='adminEditWrapper'>
      {loaded && isAdmin ? (
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='name'
                variant='outlined'
                label='name'
                {...formik.getFieldProps('name')}
                {...errorHelper(formik, 'name')}
              />
            </div>
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
                name='phone'
                variant='outlined'
                label='phone'
                {...formik.getFieldProps('phone')}
                {...errorHelper(formik, 'phone')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='address'
                variant='outlined'
                label='address'
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
                label='zip'
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
                type='number'
                variant='outlined'
                label='latitude'
                {...formik.getFieldProps('latitude')}
                {...errorHelper(formik, 'latitude')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='runs'
                type='number'
                variant='outlined'
                label='runs'
                {...formik.getFieldProps('runs')}
                {...errorHelper(formik, 'runs')}
              />
            </div>
            <div className='mt-3'>
              <TextField
                style={{ width: '100%' }}
                name='lifts'
                type='number'
                variant='outlined'
                label='lifts'
                {...formik.getFieldProps('lifts')}
                {...errorHelper(formik, 'lifts')}
              />
            </div>

            <div className='mt-3'>
              Description:
              <WYSIWYG
                setEditorState={(state) => handleEditorState(state)}
                setEditorBlur={(blur) => handleEditorBlur(blur)}
                editContent={editDescription}
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
                {...errorHelper(formik, 'description')}
              />
            </div>
            <Button variant='contained' color='primary' type='submit'>
              Save Changes
            </Button>
          </form>
          <hr />
          <div onClick={handleDelete}>Delete Resort</div>
        </div>
      ) : (
        <div className='mt-3'>not sup</div>
      )}
    </div>
  );
};

export default Edit;
