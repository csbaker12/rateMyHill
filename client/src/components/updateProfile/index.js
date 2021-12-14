import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserById } from '../../store/actions/user_actions';
const UpdateProfile = () => {
  let users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (users && users.data && !users.currentUser) {
      dispatch(getUserById(users.data._id));
    }
  }, [users, dispatch]);

  useEffect(() => {
    if (users && users.data) {
      checkStatus();
    }
    if (users && users.currentUser) {
      checkUserLoaded();
    }
  }, [users]);

  const checkStatus = () => {
    if (users.data._id) {
      setLoggedIn(true);
    }
  };

  const checkUserLoaded = () => {
    if (users.currentUser) {
      setLoaded(true);
    }
  };

  return (
    <div>
      {loggedIn && loaded ? (
        <>
          <div>{users.data._id}</div>
          <div>{users.data.email}</div>
        </>
      ) : (
        <div>def not sup</div>
      )}{' '}
    </div>
  );
};

export default UpdateProfile;
