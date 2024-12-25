import React, { useState } from 'react';
import { Box, Text, Button, Input, VStack, Link, useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://formee.onrender.com/api/auth/login', { email, password });
      setToken(response.data.token); // Save the token in the parent component's state
      setError(''); // Clear any previous error

      // Redirect to the dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials!'); // Set error message
    }
  };

  // Function to handle redirection to the register page
  const goToRegister = () => {
    navigate('/register'); // Navigate to the register page
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt="10"
      p={{ base: '6', md: '10' }}
      borderRadius="xl"
      bg="white"
      boxShadow="xl"
      borderWidth="1px"
      fontFamily="Poppins"
    >
      <VStack spacing={6} align="center">
        <Text fontSize="3xl" fontWeight="bold" color="blue.600">
          Formee Login
        </Text>
<Text fontFamily="Poppins">Hey! Enter your details to sign in to your account</Text>
        {/* Form Section */}
        <Box width="100%" maxW="lg" p={6} borderRadius="md" boxShadow="sm">
          <form onSubmit={handleLogin}>
            <VStack spacing={4} align="stretch">
              {/* Email Input */}
              <Box>
                <Text mb="2" fontWeight="semibold" color="gray.600">
                  Email Address
                </Text>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="gray.100"
                  borderColor="gray.300"
                  focusBorderColor="blue.500"
                  _hover={{ borderColor: 'blue.400' }}
                />
              </Box>

              {/* Password Input */}
              <Box>
                <Text mb="2" fontWeight="semibold" color="gray.600">
                  Password
                </Text>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg="gray.100"
                  borderColor="gray.300"
                  focusBorderColor="blue.500"
                  _hover={{ borderColor: 'blue.400' }}
                />
              </Box>

              {/* Error Message */}
              {error && (
                <Text color="red.500" fontSize="sm" textAlign="center">
                  {error}
                </Text>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                size="lg"
                mt={4}
                _hover={{ bg: 'blue.600' }}
                boxShadow="md"
              >
                Log In
              </Button>
            </VStack>
          </form>
        </Box>

        {/* Register Link */}
        <Text fontSize="sm" color="gray.600">
          Don't have an account?{' '}
          <Link color="black.500" fontWeight="bold"  onClick={goToRegister} style={{ cursor: 'pointer', textDecoration: 'none' }}>
            Register here
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
