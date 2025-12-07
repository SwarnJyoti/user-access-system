import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Link as MuiLink } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API;



  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const err = {};
    if (!form.email.trim()) err.email = 'Email is required';
    if (!form.password.trim()) err.password = 'Password is required';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) return setErrors(validationErrors);

    try {
      const res = await axios.post(`${API}/auth/login`, form);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Navbar showHome />
      <Box
        sx={{
          backgroundImage: "url('/assets/background.jpg')",
          backgroundSize: 'cover',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2
        }}
      >
        <Container
          maxWidth="xs"
          sx={{ backgroundColor: 'rgba(255,255,255,0.9)', p: 4, borderRadius: 3, boxShadow: 3 }}
        >
          <Typography variant="h4" align="center" gutterBottom>Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="dense"
              size="small"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="dense"
              size="small"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account?{' '}
              <MuiLink component={Link} to="/">Sign Up</MuiLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;

