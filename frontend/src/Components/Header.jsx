import React from 'react';
import { Flex, Heading, Link, Spacer, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <Flex as="header" bg="white" p={4} boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" align="center">
      {/* Logo */}
      <Heading as="h1" fontSize="3xl" fontWeight="bold" color="black">
        <span style={{ color: '#003366' }}>F</span>ormee
      </Heading>

      <Spacer />

      {/* Navbar Links */}
      <Flex gap={4} align="center">
        <Link
          fontWeight="medium"
          fontSize="md"
          _hover={{ textDecoration: 'underline', color: '#003366' }}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard {/* Reduced font size */}
        </Link>
        <Link
          fontWeight="medium"
          fontSize="md"
          _hover={{ textDecoration: 'underline', color: '#003366' }}
          onClick={() => navigate('/create-form')}
        >
          Create Form {/* Reduced font size */}
        </Link>
        <Button
          colorScheme="blue"
          size="sm"
          onClick={handleLogout}
          _hover={{ bg: '#003366' }}
        >
          Log Out
        </Button>
      </Flex>
    </Flex>
  );
}

export default Header;
