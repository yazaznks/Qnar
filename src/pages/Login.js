import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
// import axios from 'axios';
import { useLocation } from 'wouter';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: '20px' }}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: '20px' }}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Box>
  );

};
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [location, setLocation] = useLocation();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/token/', { // Updated to match Django URL
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();

//       if (data.access) {
//         localStorage.setItem('access_token', data.access);
//         localStorage.setItem('username', username);
//         setLocation('/'); // Redirect to home page
//       } else {
//         setError('Invalid username or password');
//       }
//     } catch (error) {
//       setError('There was a problem with the login request');
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         backgroundColor: '#f9f9f9',
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           padding: '40px 20px',
//           maxWidth: '400px',
//           width: '100%',
//           backgroundColor: 'rgba(207, 231, 213, 0.7)',
//         }}
//       >
//         <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', color: '#3B5D44' }}>
//           Login
//         </Typography>

//         <TextField
//           fullWidth
//           label="Username"
//           variant="outlined"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           sx={{ marginBottom: '20px', backgroundColor: '#fff' }}
//         />
//         <TextField
//           fullWidth
//           label="Password"
//           type="password"
//           variant="outlined"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           sx={{ marginBottom: '20px', backgroundColor: '#fff' }}
//         />

//         {error && (
//           <Typography color="error" sx={{ textAlign: 'center', marginBottom: '20px' }}>
//             {error}
//           </Typography>
//         )}

//         <Button
//           fullWidth
//           variant="contained"
//           sx={{ backgroundColor: '#3B5D44', color: '#fff', marginBottom: '20px' }}
//           onClick={handleLogin}
//         >
//           Login
//         </Button>

//         <Typography variant="body2" sx={{ textAlign: 'center', color: '#3B5D44' }}>
//           Don't have an account?{' '}
//           <a href="/signup" style={{ color: '#EB8576', textDecoration: 'none' }}>
//             Sign up
//           </a>
//         </Typography>
//       </Paper>
//     </Box>
//   );
// }

export default Login;
