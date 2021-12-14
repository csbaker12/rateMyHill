import { useDispatch } from 'react-redux';
import { validation, formValues } from './validationSchema';
import { TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { useState } from 'react';
import { logInUser } from '../../store/actions/user_actions';
import { useNavigate } from 'react-router-dom';
import CreateAccount from '../createAccount';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createAccount, setCreateAccount] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: validation,
    onSubmit: (values) => {
      dispatch(logInUser(values));
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

  const handleCreateAccount = () => {
    if (createAccount) {
      setCreateAccount(false);
    } else {
      setCreateAccount(true);
    }
  };
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
          Sign In
        </Button>
      </form>
      <div>
        <br />
        <p>New to Rate My Hill?</p>
        <div onClick={handleCreateAccount}>Create Account</div>
        <br />
        {createAccount ? (
          <div>
            <CreateAccount />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Auth;
