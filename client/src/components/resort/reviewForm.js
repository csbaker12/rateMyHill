import { useSelector, useDispatch } from 'react-redux';
import WYSIWYG from '../utils/wysiwyg';
import { validation, formValues } from './validationSchema';
import { TextField, Button, FormHelperText } from '@material-ui/core';
import { useFormik } from 'formik';
import { useState } from 'react';
import { addReview } from '../../store/actions/review_actions';

const ReviewForm = () => {
  let resorts = useSelector((state) => state.resorts);
  const dispatch = useDispatch();

  const [editorBlur, setEditorBlur] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      let resortId = { resortId: resorts.resort._id };
      let result = Object.assign(values, resortId);
      console.log(result);

      dispatch(addReview(result));
    },
  });

  const handleEditorState = (state) => {
    formik.setFieldValue('content', state, true);
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

  //   useEffect(() => {
  //     if (notifications && notifications.success) {
  //       props.history.push('/');
  //     }
  //   });

  return (
    <>
      <hr />
      {/* sup {resorts.resort._id}{' '} */}
      <form onSubmit={formik.handleSubmit}>
        {' '}
        <div>
          <TextField
            style={{ width: '100%' }}
            name='author'
            label='Your name'
            variant='outlined'
            {...formik.getFieldProps('author')}
            {...errorHelper(formik, 'author')}
          />
        </div>
        <hr />
        <div>
          Leave a review:
          <WYSIWYG
            setEditorState={(state) => handleEditorState(state)}
            setEditorBlur={(blur) => handleEditorBlur(blur)}
          />
          {formik.errors.content && editorBlur ? (
            <FormHelperText error={true}>
              {formik.errors.content}
            </FormHelperText>
          ) : null}
          <TextField
            name='content'
            type='hidden'
            {...formik.getFieldProps('content')}
            {...errorHelper(formik, 'content')}
          />
        </div>
        <hr />
        <div>
          <TextField
            style={{ width: '100%' }}
            name='rating'
            type='number'
            label='Rating'
            variant='outlined'
            {...formik.getFieldProps('rating')}
            {...errorHelper(formik, 'rating')}
            InputProps={{ inputProps: { max: 5, min: 0 } }}
          />
        </div>
        <hr />
        <Button variant='contained' color='primary' type='submit'>
          Post Review
        </Button>
      </form>
    </>
  );
};

export default ReviewForm;
