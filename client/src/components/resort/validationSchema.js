import * as Yup from 'yup';

export const formValues = {
  content: '',
  author: '',
  rating: 0,
};

export const validation = () =>
  Yup.object({
    content: Yup.string()
      .required('Article Content Required')
      .min(8, 'Please write a longer review'),
    author: Yup.string().required('Author is Required'),
    rating: Yup.number()
      .required('Please rate the resort')
      .min(0, 'must be greater than zero')
      .max(5, 'cannot be greater than 5'),
  });
