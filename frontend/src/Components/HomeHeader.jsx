import React from 'react';
import { Flex, Heading, Box, Button, Link, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function HomeHeader() {
  const navigate = useNavigate();
  
  // Adjust font size and spacing based on screen size
  const fontSize = useBreakpointValue({ base: 'lg', md: '3xl' });
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const spacing = useBreakpointValue({ base: 2, md: 4 });

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Flex 
      as="header" 
      bg="white" 
      p={4} 
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" 
      justify="space-between" 
      align="center"
      flexWrap="wrap"
    >
      {/* Logo Section */}
      <Heading as="h1" fontSize={fontSize} fontWeight="bold" color="black">
        <span style={{ color: '#003366' }}>F</span>ormee
      </Heading>

      {/* Navigation Section */}
      <Box display="flex" alignItems="center" gap={spacing}>
        <Link onClick={() => handleNavigation('/')}> 
          <Button size={buttonSize} colorScheme="blue" variant="link">
            Home
          </Button>
        </Link>
        <Link onClick={() => handleNavigation('/register')}>
          <Button size={buttonSize} colorScheme="blue" variant="link">
            Sign Up
          </Button>
        </Link>
        <Link onClick={() => handleNavigation('/login')}>
          <Button size={buttonSize} colorScheme="blue" variant="solid">
            Log In
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}

export default HomeHeader;
