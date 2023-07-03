import { Box, Button, Container, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditUser() {
  const [loggedUser, setLoggedUser] = useState({});

  const [firstName, setFirstName] = useState(loggedUser?.firstName);
  const [lastName, setLastName] = useState(loggedUser?.lastName);
  const [mobile, setMobile] = useState(loggedUser?.mobile);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setLoggedUser(userData);
    setFirstName(userData?.firstName);
    setLastName(userData?.lastName);
    setMobile(userData?.mobile);
  }, []);

  const styleDiv = {
    marginTop: '15px',
  };

  function handleUpdateUser() {
    var user = {
      ...loggedUser,
      firstName: firstName || loggedUser.firstName,
      lastName: lastName || loggedUser.lastName,
      mobile: mobile || loggedUser.mobile,
    };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/dashboard');
  }

  function handleCancel() {
    navigate(-1);
  }
  return (
    <Container component='div' maxWidth='xs'>
      <h1>Edit User </h1>
      <Box sx={styleDiv}>
        <TextField
          fullWidth
          autoComplete='firstName'
          autoFocus
          variant='outlined'
          label='First Name'
          placeholder='First Name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Box>
      <Box sx={styleDiv}>
        <TextField
          fullWidth
          autoComplete='lastName'
          variant='outlined'
          label='Last Name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Box>
      <Box sx={styleDiv}>
        <TextField
          fullWidth
          autoComplete='mobile'
          variant='outlined'
          label='Mobile'
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </Box>
      <Box sx={styleDiv}>
        <Button variant='contained' onClick={handleCancel}>
          Back
        </Button>

        <Button
          style={{ marginLeft: '40px' }}
          variant='contained'
          onClick={handleUpdateUser}
        >
          Edit
        </Button>
      </Box>
    </Container>
  );
}
