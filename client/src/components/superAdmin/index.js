import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { getResorts } from '../../store/actions/resort_actions';
import { getAllReviews } from '../../store/actions/review_actions';
import { getAllUsers } from '../../store/actions/user_actions';
import './superAdmin.css';
import { useNavigate } from 'react-router-dom';
import { deleteResort } from '../../store/actions/resort_actions';
import { deleteReview } from '../../store/actions/review_actions';
import { deleteUser } from '../../store/actions/user_actions';

const SuperAdmin = () => {
  let users = useSelector((state) => state.users);
  let resorts = useSelector((state) => state.resorts);
  let reviews = useSelector((state) => state.reviews);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [resortsLoaded, setResortsLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (reviews && !reviews.reviewsList) {
      dispatch(getAllReviews());
    }
    if (resorts && !resorts.resortList) {
      dispatch(getResorts());
    }
    if (users && !users.usersList) {
      dispatch(getAllUsers());
    }
  }, []);

  useEffect(() => {
    if (users && users.data) {
      checkStatus();
    }
    if (users && users.userList) {
      checkForUsers();
    }
  }, [users, dispatch]);

  useEffect(() => {
    if (reviews.reviewList) {
      checkReviews();
    }
  }, [reviews, dispatch]);

  useEffect(() => {
    if (resorts.resortList) {
      checkResorts();
    }
  }, [resorts, dispatch]);

  const checkReviews = () => {
    if (reviews.reviewList.reviews) {
      setReviewsLoaded(true);
    }
  };

  const checkStatus = () => {
    if (users.data.role === 'superAdmin') {
      setIsSuperAdmin(true);
    }
  };

  const checkForUsers = () => {
    if (users.userList.users) {
      setUsersLoaded(true);
    }
  };

  const checkResorts = () => {
    if (resorts.resortList.resorts) {
      setResortsLoaded(true);
    }
  };

  const handleResortEdit = (item) => {
    navigate(`/admin/${item._id}`);
  };

  const handleDeleteResort = (item) => {
    dispatch(deleteResort(item._id));
  };

  const handleDeleteReview = (item) => {
    dispatch(deleteReview(item._id));
  };

  const handleDeleteUser = (item) => {
    dispatch(deleteUser(item._id));
  };
  return (
    <div>
      {isSuperAdmin && reviewsLoaded && usersLoaded && resortsLoaded ? (
        <div>
          <div className='sAMainContainer'>
            <p>Resorts:</p>
            {resorts.resortList.resorts.map((item) => (
              <div>
                {item.isActive ? (
                  <div className='sAIndCont' key={item._id}>
                    <div className='row'>
                      <div className='col-6'> {item.name}</div>
                      <div
                        className='col-3'
                        onClick={() => handleResortEdit(item)}>
                        Edit
                      </div>
                      <div
                        className='col-3'
                        onClick={() => handleDeleteResort(item)}>
                        Delete
                      </div>
                    </div>{' '}
                  </div>
                ) : null}
              </div>
            ))}
            <br />
          </div>
          <div className='sAMainContainer'>
            <p>Reviews:</p>
            {reviews.reviewList.reviews.map((item) => (
              <div>
                {item.isActive ? (
                  <div className='sAIndCont' key={item._id}>
                    <div className='row'>
                      <div className='col-9'>
                        {' '}
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item.content,
                          }}></p>
                      </div>
                      <div
                        className='col-3'
                        onClick={() => handleDeleteReview(item)}>
                        Delete
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className='sAMainContainer'>
            <p>Users:</p>
            {users.userList.users.map((item) => (
              <div>
                {item.isActive ? (
                  <div className='sAIndCont' key={item._id}>
                    <div className='row'>
                      <div className='col-9'> {item.email}</div>
                      <div
                        className='col-3'
                        onClick={() => handleDeleteUser(item)}>
                        Delete
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>not sup</div>
      )}
    </div>
  );
};

export default SuperAdmin;
