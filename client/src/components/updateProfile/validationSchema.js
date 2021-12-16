import * as Yup from 'yup';

export const formValues = {
  email: '',
  username: '',
};

export const validation = () =>
  Yup.object({
    email: Yup.string().required('Email is Required'),
    username: Yup.string().required('Username is Required'),
  });
