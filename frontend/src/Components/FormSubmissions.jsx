import React, { useState, useEffect } from 'react';
import { Box, Text, Button, VStack, Divider, SimpleGrid, GridItem, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FormSubmissions = ({ token }) => {
  const { formId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!token) {
        setError('Authentication token is required.');
        return;
      }

      try {
        const response = await axios.get(`https://formee.onrender.com/api/submissions/${formId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        setError('Failed to load submissions. Please try again.');
      }
    };

    fetchSubmissions();
  }, [formId, token]);

  return (
    <Box maxW="4xl" mx="auto" mt="10" p="6" boxShadow="lg" borderRadius="lg" bg="white">
      <Text fontSize="2xl" mb="4" textAlign="center" fontWeight="bold">Form Submissions</Text>

      {error && <Text color="red.500" mb="4">{error}</Text>}

      {submissions.length === 0 ? (
        <Text textAlign="center" fontSize="lg" color="gray.500">No submissions yet.</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {submissions.map((submission, index) => (
            <Box key={index} p="4" borderRadius="md" borderWidth="1px" boxShadow="sm" bg="gray.50">
              <Text fontWeight="bold" mb="2">Submission {index + 1}</Text>
              <Divider mb="4" />
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {Object.entries(submission.data).map(([field, value], idx) => (
                  <GridItem key={idx}>
                    <Flex justify="space-between">
                      <Text fontWeight="medium">{field}</Text>
                      <Text>{value}</Text>
                    </Flex>
                  </GridItem>
                ))}
              </SimpleGrid>

            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default FormSubmissions;
