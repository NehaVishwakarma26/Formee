import React from 'react';
import { Flex, Heading, Link, Spacer, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <Flex 
      as="header" 
      bg="white" 
      p={4} 
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" 
      align="center"
      flexDirection={{ base: "column", md: "row" }} // Stack items on small screens
      textAlign="center"
    >
      {/* Logo */}
      <Heading 
        as="h1" 
        fontSize={{ base: "2xl", md: "3xl" }} // Smaller on mobile, bigger on desktop
        fontWeight="bold" 
        color="black"
      >
        <span style={{ color: '#003366' }}>F</span>ormee
      </Heading>

      <Spacer display={{ base: "none", md: "flex" }} /> {/* Hide spacer on mobile */}

      {/* Navbar Links */}
      <Flex 
        gap={4} 
        align="center"
        flexDirection={{ base: "column", md: "row" }} // Stack links on mobile
        mt={{ base: 2, md: 0 }} // Add space only on small screens
      >
        <Link
          fontWeight="medium"
          fontSize={{ base: "lg", md: "md" }} // Larger text on mobile
          _hover={{ textDecoration: 'underline', color: '#003366' }}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </Link>
        <Link
          fontWeight="medium"
          fontSize={{ base: "lg", md: "md" }} // Larger text on mobile
          _hover={{ textDecoration: 'underline', color: '#003366' }}
          onClick={() => navigate('/create-form')}
        >
          Create Form
        </Link>
        <Button
          colorScheme="blue"
          size={{ base: "md", md: "sm" }} // Slightly bigger button on mobile
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
