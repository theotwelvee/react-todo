import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export default function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState('');
  const [profileImage, setProfileImage] = useState();

  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  function registerUser() {
    setIsSubmit(true);

    var user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      mobile: mobile,
      profileImage: profileImage,
    };

    if (firstName && lastName && email && password && mobile && profileImage) {
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/login');
    }
  }

  const styleDiv = {
    marginTop: '20px',
  };

  const handleImageChange = async (input) => {
    const imageData = await toBase64(input.target.files[0]);
    setProfileImage(imageData);
  };

  function visibilityPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <Container component='div' maxWidth='xs'>
        <h1>User Registration</h1>
        <Box sx={styleDiv}>
          <TextField
            fullWidth
            autoComplete='firstName'
            autoFocus
            variant='outlined'
            label='First Name'
            placeholder='First Name'
            value={firstName}
            error={isSubmit && !firstName ? true : false}
            helperText={isSubmit && !firstName ? 'Please enter first name' : ''}
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
            helperText={isSubmit && !lastName ? 'Please enter last name' : ''}
            error={isSubmit && !lastName ? true : false}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <Box sx={styleDiv}>
          <TextField
            fullWidth
            autoComplete='email'
            variant='outlined'
            label='Email'
            value={email}
            helperText={isSubmit && !email ? 'Please enter email' : ''}
            error={isSubmit && !email ? true : false}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box sx={styleDiv}>
          <TextField
            fullWidth
            autoComplete='password'
            variant='outlined'
            label='Password'
            type={showPassword ? 'text' : 'password'}
            value={password}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={visibilityPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={isSubmit && !password ? 'Please enter password' : ''}
            error={isSubmit && !password ? true : false}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box sx={styleDiv}>
          <TextField
            fullWidth
            autoComplete='mobile'
            variant='outlined'
            label='Mobile'
            value={mobile}
            helperText={isSubmit && !mobile ? 'Please enter mobile' : ''}
            error={isSubmit && !mobile ? true : false}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Box>
        <Box sx={styleDiv}>
          <Button variant='contained' component='label'>
            Upload Image
            <input
              type='file'
              hidden
              onChange={handleImageChange}
              accept='.jpg, .jpeg, .png'
            />
          </Button>
          {profileImage ? (
            <Box sx={styleDiv}>
              Image Preview
              <img src={profileImage} height={200} />
            </Box>
          ) : (
            isSubmit && (
              <p style={{ color: 'red', fontSize: '13px' }}>
                Select profile image
              </p>
            )
          )}
        </Box>
        <Box sx={styleDiv}>
          <Button variant='contained' fullWidth onClick={registerUser}>
            Sign Up
          </Button>
        </Box>
      </Container>
    </div>
  );
}
