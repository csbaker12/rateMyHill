import * as Yup from 'yup';

export const formValues = {
  email: '',
  name: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  description: '',
  website: '',
  runs: '',
  lifts: '',
  longitude: '',
  latitude: '',
};

export const validation = () =>
  Yup.object({
    email: Yup.string().required('Email is Required'),
    name: Yup.string().required('Please enter Resort Name'),
    phone: Yup.string().required('Please enter Phone Number'),
    address: Yup.string().required('Please enter Resort Address'),
    city: Yup.string().required('Please enter City'),
    state: Yup.string().required('Please enter State'),
    postalCode: Yup.string().required('Please enter Postal Code'),
    description: Yup.string()
      .required('Please enter a Description')
      .min(10, 'Enter a longer description')
      .max(200, 'Please shorten the description to 200 characters'),
    website: Yup.string().required('Please enter website'),
    runs: Yup.number()
      .required('Enter number of Runs')
      .min(1, 'You have at least one run right?'),
    lifts: Yup.number()
      .required('Please enter number of lifts')
      .min(0, 'You cant have negative lifts'),
    longitude: Yup.number().required('Please enter the resort Longitude'),
    latitude: Yup.number().required('Please enter the resort Latitude'),
  });
