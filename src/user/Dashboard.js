import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import AlertDialog from '../todo/ConfirmationDialog';
import EditTodoDialog from '../todo/EditTodoDialog';
import Todos from '../todo/Todo';
import TodoInput from '../todo/TodoInput';

export default function Dashboard() {
  const [loggedUser, setLoggedUser] = useState({});
  const [cookie] = useCookies();
  const [isCookie, setIsCookie] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('user')));

    if (loggedUser) {
      cookie.LOGIN_TOKEN && setIsCookie(true);
    }
  }, []);

  function handleEditUser(e) {
    e.preventDefault();
    navigate('/edit');
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <img src={loggedUser.profileImage} height={100} />
        </Grid>
        <Grid item xs={8}>
          <h1 style={{ textAlign: 'center' }}>
            Welcome to Dashboard {loggedUser && loggedUser.firstName}
          </h1>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center', marginTop: '24px' }}>
          {isCookie && (
            <Link component='button' variant='body2' onClick={handleEditUser}>
              Edit User Info
            </Link>
          )}
        </Grid>
      </Grid>

      <TodoInput />
      <Todos />
      <AlertDialog />
      <EditTodoDialog />
    </>
  );
}
