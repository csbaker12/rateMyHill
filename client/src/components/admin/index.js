import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResorts } from '../../store/actions/resort_actions';
import { useNavigate } from 'react-router-dom';
import { clearResort } from '../../store/actions';

const Admin = () => {
  let resorts = useSelector((state) => state.resorts);
  let users = useSelector((state) => state.users);
  let dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (resorts && !resorts.resortList) {
      dispatch(getResorts());
    }
  }, []);

  useEffect(() => {
    if (resorts.resortList) {
      checkResorts();
    }
  }, [resorts.resortList]);

  useEffect(() => {
    if (resorts.resort) {
      dispatch(clearResort());
    }
  }, []);

  useEffect(() => {
    if (users && users.data) {
      checkStatus();
    }
  }, [users]);

  const checkStatus = () => {
    if (users.data.role === 'admin' || users.data.role === 'superAdmin') {
      setIsAdmin(true);
    }
    setUserId(users.data._id);
  };

  const checkResorts = () => {
    if (resorts.resortList.resorts) {
      setLoaded(true);
    }
  };

  const handleEdit = (item) => {
    console.log(item);
    navigate(`/admin/${item._id}`);
  };

  const handleCreateResort = () => {
    navigate(`/admin/createResort`);
  };

  return (
    <>
      {loaded && isAdmin ? (
        <div>
          {resorts.resortList.resorts.map((item) => (
            <div>
              {item.isActive && item.userId === userId ? (
                <div onClick={() => handleEdit(item)} key={item._id}>
                  {item.name}
                </div>
              ) : null}
            </div>
          ))}
          <div onClick={handleCreateResort}>Create Resort</div>
        </div>
      ) : (
        <div>You either don't have access or I'm bad at coding</div>
      )}
    </>
  );
};

export default Admin;
