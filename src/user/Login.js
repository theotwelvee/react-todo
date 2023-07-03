import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [cookie, setCookie] = useCookies(['loggedInUser']);

  const navigate = useNavigate();

  function LoginUser() {
    setIsLogin(true);
    const localUser = JSON.parse(localStorage.getItem('user'));

    if (localUser.email === email && localUser.password === password) {
      setCookie('LOGIN_TOKEN', crypto?.randomUUID());
      navigate('/dashboard');
    }
  }
  function visibilityPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <Container component='div' maxWidth='xs'>
        <h1>Login</h1>
        <div style={{ paddingTop: '12px' }}>
          <TextField
            fullWidth
            autoComplete='email'
            variant='outlined'
            label='Email'
            value={email}
            helperText={isLogin && !email ? 'Please enter email' : ''}
            error={isLogin && !email ? true : false}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ paddingTop: '12px' }}>
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
            helperText={isLogin && !password ? 'Please enter password' : ''}
            error={isLogin && !password ? true : false}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ paddingTop: '12px' }}>
          <Button variant='contained' fullWidth onClick={LoginUser}>
            Login
          </Button>
        </div>
      </Container>
    </div>
  );
}
