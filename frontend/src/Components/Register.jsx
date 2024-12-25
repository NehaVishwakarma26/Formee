import React, { useState } from 'react';
import { Button, Input, Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Register = ({ setToken }) => {  // Accept setToken as a prop
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://formee.onrender.com/api/auth/register', { name, email, password });
      console.log('Registration Success:', response.data); // Log the response from backend

      // Check if the token is received
      if (response.data.token) {
        setToken(response.data.token); // Save the token in the parent component's state
        setError('');

        // Redirect to the Login page after successful registration
        navigate('/'); // Navigate to /login after successful registration
      } else {
        setError('Registration failed! No token received');
      }
    } catch (err) {
      console.error('Registration error:', err); // Log the error for better debugging
      setError(err.response?.data?.message || 'Registration failed!'); // Display the error message from backend
    }
  };

  return (
    <Box maxW="lg"
    mx="auto"
    mt="10"
    p={{ base: '6', md: '10' }}
    borderRadius="xl"
    bg="white"
    boxShadow="xl"
    borderWidth="1px"
    fontFamily="Poppins">
      <Text fontSize="3xl" fontWeight="bold" color="blue.600" align="center" mb={6}>Register</Text>
      <Text fontFamily="Poppins" align="center" mb={6}>Hey! Enter your details to create your account</Text>
      
      <form onSubmit={handleRegister}>
        <Box mb="4">
          <Text mb="2" fontWeight="medium">Name</Text>
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </Box>
        <Box mb="4">
          <Text mb="2" fontWeight="medium">Email</Text>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </Box>
        <Box mb="4">
          <Text mb="2" fontWeight="medium">Password</Text>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </Box>
        {error && <Text color="red.500" mb="4">{error}</Text>}
        <Button type="submit" colorScheme="blue" width="full">Register</Button>
      </form>
    </Box>
  );
};

export default Register;
