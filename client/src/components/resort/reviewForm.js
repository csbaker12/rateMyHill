import { useSelector, useDispatch } from 'react-redux';
import WYSIWYG from '../utils/wysiwyg';
import { validation, formValues } from './validationSchema';
import { TextField, Button, FormHelperText } from '@material-ui/core';
import { useFormik } from 'formik';
import { useState } from 'react';
import { addReview } from '../../store/actions/review_actions';
import './reviewForm.css';

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
      {/* sup {resorts.resort._id}{' '} */}
      <form onSubmit={formik.handleSubmit}>
        {' '}
        <div className='mt-3'>
          <TextField
            style={{ width: '100%', backgroundColor: 'white' }}
            name='author'
            label='Your name'
            variant='outlined'
            {...formik.getFieldProps('author')}
            {...errorHelper(formik, 'author')}
          />
        </div>
        <br />
        <div>
          Leave a Review:
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
        <div>
          Rating:
          <TextField
            style={{ width: '100%', backgroundColor: 'white' }}
            name='rating'
            type='number'
            variant='outlined'
            {...formik.getFieldProps('rating')}
            {...errorHelper(formik, 'rating')}
            InputProps={{ inputProps: { max: 5, min: 0 } }}
          />
        </div>
        <br />
        <div className='postreviewbtn'>
          <Button variant='contained' color='primary' type='submit'>
            Post Review
          </Button>
        </div>
      </form>
    </>
  );
};

export default ReviewForm;
