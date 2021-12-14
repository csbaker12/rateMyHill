import { useDispatch } from 'react-redux';
import { validation, formValues } from './validationSchema';
import { TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { createAccount } from '../../store/actions/user_actions';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: validation,
    onSubmit: (values) => {
      dispatch(createAccount(values));
      navigate(`/`);
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
    <div>
      {' '}
      <form onSubmit={formik.handleSubmit}>
        {' '}
        <div>
          <TextField
            style={{ width: '100%' }}
            name='email'
            label='Email'
            variant='outlined'
            {...formik.getFieldProps('email')}
            {...errorHelper(formik, 'email')}
          />
        </div>
        <br />
        <div>
          <TextField
            style={{ width: '100%' }}
            name='username'
            label='Username'
            variant='outlined'
            {...formik.getFieldProps('username')}
            {...errorHelper(formik, 'username')}
          />
        </div>
        <br />
        <div>
          <TextField
            style={{ width: '100%' }}
            name='password'
            label='Password'
            variant='outlined'
            type='password'
            {...formik.getFieldProps('password')}
            {...errorHelper(formik, 'password')}
          />
        </div>
        <br />
        <Button variant='contained' color='primary' type='submit'>
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default CreateAccount;
