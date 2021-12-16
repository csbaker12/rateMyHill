import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getResortById } from '../../store/actions/resort_actions';
import { clearResortList } from '../../store/actions';
import { getReviewsByResortId } from '../../store/actions/review_actions';
import './resort.css';
import ReviewForm from './reviewForm';

const Resort = () => {
  let resorts = useSelector((state) => state.resorts);
  let reviews = useSelector((state) => state.reviews);
  let notifications = useSelector((state) => state.notifications);
  let users = useSelector((state) => state.users);

  const current = resorts?.resort;
  const currentReviews = reviews.reviews;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadReviews, setLoadReviews] = useState(false);
  const [reviewForm, setReviewForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (resorts && !resorts.resort) {
      dispatch(getResortById(id));
      dispatch(clearResortList());
    }
    if (reviews && !reviews.reviews) {
      dispatch(getReviewsByResortId(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (current && reviews.reviews) {
      console.log(current);
      setLoadReviews(true);
      console.log(currentReviews);
    }
  }, [current, reviews.reviews]);
  useEffect(() => {
    if (current) {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (users && users.data) {
      checkStatus();
    }
  }, [users, notifications]);

  const checkStatus = () => {
    if (users.data._id) {
      setLoggedIn(true);
    }
  };

  const toggleForm = () => {
    if (reviewForm) {
      setReviewForm(false);
    } else {
      setReviewForm(true);
    }
  };

  return (
    <div className='resortpagebg'>
      {loading ? (
        <div>not sup</div>
      ) : (
        <div>
          {current && loadReviews ? (
            <div className='resortcontainer'>
              <div className='resorttitlecontainer'>
                {' '}
                <div className='resorttitletext'>{current.name}</div>{' '}
              </div>

              <div className='resortinfocontainer'>
                <div className='resortdescriptioncont'>
                  {' '}
                  <div className='resortdescriptiontitle'>Description</div>
                  <hr />
                  <div className='resortdescriptiontext'>
                    {current.description}
                  </div>
                </div>{' '}
                <div className='resortstatscont'>
                  <div className='resortstatstitle'> Statistics</div>
                  <hr />
                  <div className='resortstatstext'>
                    <div> runs: {current.runs}</div>
                    <div>lifts: {current.lifts}</div>
                    <div>
                      <p>rating: {current.rating[0].toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className='resortinfocont'>
                  <div className='resortinfotitle'>Information</div>
                  <hr />
                  <div className='resortinfotext'>
                    <div> email: {current.email}</div>
                    <div> phone: {current.phone}</div>
                    <div>
                      address: {current.address}, {current.city} {current.state}
                      , {current.postalCode}
                    </div>
                    <div> webiste: {current.website}</div>
                  </div>
                </div>
                {loggedIn ? (
                  <div className='addreviewbtn' onClick={toggleForm}>
                    {reviewForm ? (
                      <span>Hide Form</span>
                    ) : (
                      <span>Add Review</span>
                    )}{' '}
                  </div>
                ) : null}
                <br />
                {reviewForm ? (
                  <div>
                    <ReviewForm />
                  </div>
                ) : null}
                {reviews.reviews.resort.map((item) => (
                  <div>
                    {item.review.isActive ? (
                      <div
                        key={item.review._id}
                        className='resortreviewwrapper'>
                        <div className='resortreviewtitle'>
                          <b>
                            <i>author:</i>
                          </b>{' '}
                          {item.review.author}
                        </div>
                        <div>
                          {' '}
                          <b>
                            <i>rating:</i>
                          </b>{' '}
                          {item.review.rating}
                        </div>
                        <div>
                          {' '}
                          <b>
                            <i>comment:</i>
                          </b>{' '}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: item.review.content,
                            }}></p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>we got issues</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Resort;

//cscareers.dev/companies
//stackoverflow
//maccy.app
//testing or qa type of work or software support role could help
