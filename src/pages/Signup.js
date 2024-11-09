import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Grid, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          Register
        </Button>
      </form>
    </Box>
  );
};

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const handleRegister = async () => {
//     try {
//       await axios.post('http://127.0.0.1:8000/api/register/', { username, password });
//       setSuccess(true);
//       setUsername('');
//       setPassword('');
//     } catch (err) {
//       setError('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
//       <Typography variant="h4" gutterBottom>
//         Register
//       </Typography>
//       <TextField
//         label="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         sx={{ marginBottom: '20px' }}
//       />
//       <TextField
//         label="Password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         sx={{ marginBottom: '20px' }}
//       />
//       <Button
//         onClick={handleRegister}
//         variant="contained"
//         color="primary"
//       >
//         Register
//       </Button>

//       <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
//         <Alert onClose={() => setSuccess(false)} severity="success">
//           Registration successful!
//         </Alert>
//       </Snackbar>

//       <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
//         <Alert onClose={() => setError('')} severity="error">
//           {error}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

export default Signup;
