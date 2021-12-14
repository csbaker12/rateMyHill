import * as Yup from 'yup';

export const formValues = {
  email: '',
  password: '',
};

export const validation = () =>
  Yup.object({
    email: Yup.string().required('Email is Required'),
    password: Yup.string().required('Password is Required'),
  });
