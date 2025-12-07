import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Link as MuiLink } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API;


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const err = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.username.trim()) err.username = 'Username is required';
    if (!form.email.trim()) err.email = 'Email is required';
    else if (!emailRegex.test(form.email)) err.email = 'Enter a valid email';
    if (!form.password.trim()) err.password = 'Password is required';

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) return setErrors(validationErrors);

    try {
      await axios.post(`${API}/auth/register`, form);
      alert('Registered successfully. Please login.');
      navigate('/login');
    } catch (err) {
      const message = err.response?.data?.message;
      if (message && message.includes('exists')) setErrors({ email: message });
      else alert(message || 'Registration failed');
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
          <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              margin="dense"
              size="small"
              value={form.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
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
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{' '}
              <MuiLink component={Link} to="/login">Login</MuiLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Signup;
