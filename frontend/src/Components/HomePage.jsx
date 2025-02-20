import React from 'react';
import { Box, Flex, Button, Text, Heading, VStack, Container, Image, SimpleGrid, Icon, Link, HStack} from '@chakra-ui/react';
import { FaCheckCircle, FaShareAlt, FaFileAlt } from 'react-icons/fa'; // Icons for steps
import mainImg from '../assets/images/logo.png'
const HeroSection = () => {
  return (
    <Box bg="blue.600" color="white" py={20} fontFamily="Poppins,sans-serif">
      <Container maxW="container.xl">
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
          <VStack align="start" spacing={4} maxW="lg" >
            <Heading as="h2" size="2xl" fontWeight="bold" fontFamily="Poppins,sans-serif" mb={4}>
              Create, Share, and Manage Forms with Ease
            </Heading>
            <Text fontSize="lg" color="whiteAlpha.800">
              Formee makes it easy to create customizable forms, collect data, and analyze submissions in real-time.
            </Text>
            <Button mb="4" backgroundColor="#89A8B2" color="white" size="lg" mt={6} as="a" href="/login">
              Create Your First Form
            </Button>
          </VStack>
          <Image 
  src={mainImg} 
  alt="App screenshot" 
  boxSize={{ base: "23em", md: "25em", lg: "30em" }} 
  borderRadius="lg"
  ml={{ base: "4px", md: "0", lg: "0" }} 
  alignSelf={{ base: "flex-start", md: "center" }} 
/>

        </Flex>
      </Container>
    </Box>
  );
};

const StepsSection = () => {
  return (
    <Box py={24} fontFamily="Poppins" >
      <Container maxW="container.xl">
        <Heading as="h3" size="2xl" textAlign="center" mb={8} fontFamily="Poppins">
          How to Create and Share a Form
        </Heading>
      
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={20} pt={20}>
          <VStack align="start" spacing={4} textAlign="center" backgroundColor="#F1F0E8" padding={10} borderRadius="1em">
            <Icon as={FaFileAlt} w={10} h={10} color="blue.600" />
            <Heading size="lg">Create a Form</Heading>
            <Text textAlign="left">
              Use our intuitive drag-and-drop builder to create forms in minutes, with customizable fields, themes, and templates.
            </Text>
          </VStack>
          <VStack align="start" spacing={4} textAlign="center" backgroundColor="#F1F0E8" padding={10} borderRadius="1em">
            <Icon as={FaCheckCircle} w={10} h={10} color="green.600" />
            <Heading size="lg">Share Your Form</Heading>
            <Text textAlign="left">
              Share the form link with others or embed it on your website to start collecting responses.
            </Text>
          </VStack>
          <VStack align="start" spacing={4} textAlign="center" backgroundColor="#F1F0E8" padding={10} borderRadius="1em">
            <Icon as={FaShareAlt} w={10} h={10} color="purple.600" />
            <Heading size="lg">Track and Analyze</Heading>
            <Text textAlign="left">
              Monitor submissions in real-time, generate reports, and analyze the results using our powerful dashboard.
            </Text>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

const FeaturesSection = () => {
  return (
    <Box bg="gray.50" py={20} fontFamily="Poppins">
      <Container maxW="container.xl">
        <Heading as="h3" size="2xl" textAlign="center" mb={12} fontFamily="Poppins">
          Key Features of Formee
        </Heading>

        <VStack spacing={8} align="stretch">
          {/* Feature 1 */}
          <HStack 
            spacing={6} 
            align="start" 
            w="full"
            flexDirection={{ base: "column", md: "row" }} 
          >
            <Box flex="1" w={{ base: "100%", md: "auto" }}>
              <Heading size="lg" textAlign="left" bg="#C9E6F0" color="gray.700" p={6} borderRadius="lg" boxShadow="lg">
                Customizable Forms
              </Heading>
            </Box>
            <Box flex="2" bg="#FBF8EF" p={8} borderRadius="lg" boxShadow="lg" w={{ base: "100%", md: "auto" }}>
              <Text fontSize="lg" lineHeight="tall" color="gray.700">
                Choose from various field types, themes, and templates to create forms that match your needs.
              </Text>
            </Box>
          </HStack>

          {/* Feature 2 */}
          <HStack 
            spacing={6} 
            align="start" 
            w="full"
            flexDirection={{ base: "column", md: "row-reverse" }} 
          >
            <Box flex="1" w={{ base: "100%", md: "auto" }}>
              <Heading size="lg" textAlign="left" bg="#C9E6F0" color="gray.700" p={6} borderRadius="lg" boxShadow="lg">
                Analytics
              </Heading>
            </Box>
            <Box flex="2" bg="#FBF8EF" p={8} borderRadius="lg" boxShadow="lg" w={{ base: "100%", md: "auto" }}>
              <Text fontSize="lg" lineHeight="tall" color="gray.700">
                Track your submissions live, and view detailed analytics to get insights into your data.
              </Text>
            </Box>
          </HStack>

          {/* Feature 3 */}
          <HStack 
            spacing={6} 
            align="start" 
            w="full"
            flexDirection={{ base: "column", md: "row" }} 
          >
            <Box flex="1" w={{ base: "100%", md: "auto" }}>
              <Heading size="lg" textAlign="left" bg="#C9E6F0" color="gray.700" p={6} borderRadius="lg" boxShadow="lg">
                Seamless Integration
              </Heading>
            </Box>
            <Box flex="2" bg="#FBF8EF" p={8} borderRadius="lg" boxShadow="lg" w={{ base: "100%", md: "auto" }}>
              <Text fontSize="lg" lineHeight="tall" color="gray.700">
                Integrate your forms with external tools and platforms for automatic data collection and processing.
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

  
const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <StepsSection />
      <FeaturesSection />
    </Box>
  );
};

export default HomePage;
