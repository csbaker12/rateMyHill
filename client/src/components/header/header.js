import './header.css';
import { useNavigate } from 'react-router-dom';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { useState } from 'react';
import { Modal } from '@material-ui/core';
import { signOut } from '../../store/actions/user_actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Header = () => {
  let navigate = useNavigate();
  let users = useSelector((state) => state.users);
  let notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const reroute = () => {
    navigate('/');
  };

  const loadLogIn = () => {
    navigate('/auth');
  };

  const loadAdmin = () => {
    navigate('/admin');
  };

  const handleDropDown = () => {
    console.log('clicked');
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const signOutUser = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    if (users && users.data) {
      checkStatus();
    }
  }, [users, notifications, dropdown]);

  const checkStatus = () => {
    if (users.data.user) {
      if (users.data.user._id) {
        setLoggedIn(true);
      }

      if (
        users.data.user.role === 'admin' ||
        users.data.user.role === 'superAdmin'
      ) {
        setIsAdmin(true);
      }
    } else if (users.data) {
      if (users.data._id && users.data._id !== null) {
        setLoggedIn(true);
      }

      if (users.data.role === 'admin' || users.data.role === 'superAdmin') {
        setIsAdmin(true);
      }
      if (users.data._id === null) {
        setLoggedIn(false);
        setIsAdmin(false);
      }
    }

    setLoaded(true);
    console.log(loggedIn);
  };

  const updateProfile = () => {
    navigate('/auth/update');
  };

  return (
    <div>
      <div className='headerbg'>
        <div className='row'>
          <div className='col-3'></div>
          <div className='col-6' onClick={reroute}>
            <div className='headerlink'> Rate My Hill</div>
          </div>
          <div className='col-3'>
            <div className='dehazeicon dehazehover' onClick={handleDropDown}>
              {' '}
              <DehazeIcon style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
      <Modal open={dropdown} onClose={handleDropDown} onClick={handleDropDown}>
        <div className='dropdownmodal'>
          {loaded ? (
            <div>
              {' '}
              {loggedIn ? (
                <>
                  <div className='modaloption' onClick={signOutUser}>
                    Sign Out
                  </div>
                  <div className='modaloption' onClick={updateProfile}>
                    Update Profile
                  </div>
                </>
              ) : (
                <>
                  <div className='modaloption' onClick={loadLogIn}>
                    Log In
                  </div>
                </>
              )}
              {isAdmin ? (
                <div className='modaloption' onClick={loadAdmin}>
                  Dashboard
                </div>
              ) : null}
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Header;
