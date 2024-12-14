import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  VStack,
  Link,
  Flex,
  useToast,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  SimpleGrid,
} from '@chakra-ui/react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import axios from 'axios';

const Dashboard = ({ token }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [forms, setForms] = useState([]);
  const COLORS = ['#4A55A2', '#7895CB', '#A0BFE0', '#C5DFF8'];

  useEffect(() => {
    const fetchFormsAndLinks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forms', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formsWithLinks = await Promise.all(
          response.data.map(async (form) => {
            try {
              // Fetch the form link for each form
              const linkResponse = await axios.get(
                `http://localhost:5000/api/forms/${form._id}/link`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              const link = linkResponse.data?.[0]?.link || null;

              // Fetch the submission count
              const submissionResponse = await axios.get(
                `http://localhost:5000/api/submissions/${form._id}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              const submissionCount = submissionResponse.data.length;

              return { ...form, link, submissionCount };
            } catch {
              return { ...form, link: null, submissionCount: 0 };
            }
          })
        );

        setForms(formsWithLinks);
      } catch (error) {
        toast({
          title: 'Error loading forms.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (token) fetchFormsAndLinks();
  }, [token, toast]);

  const handleDeleteForm = async (formId) => {
    try {
      await axios.delete(`http://localhost:5000/api/forms/${formId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForms((prevForms) => prevForms.filter((form) => form._id !== formId));
      toast({
        title: 'Form deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: 'Error deleting form.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const chartData = forms.map((form) => ({
    name: form.title,
    value: form.submissionCount,
  }));

  const totalSubmissions = forms.reduce(
    (total, form) => total + form.submissionCount,
    0
  );

  return (
    <Flex bg="#F9FAFB" minH="100vh" direction="column" align="center" p="8" fontFamily="Poppins, sans-serif">
      {/* Header */}
      <Flex justify="space-between" align="center" w="full" mb="8">
        <Text fontSize="xl" fontStyle="italic" fontWeight="bold" color="#4A55A2" fontFamily="Poppins, sans-serif">
          Forming your future, one submission at a time!
        </Text>
        {/* Align Create Form Button on the right */}
        <Button onClick={() => navigate('/create-form')} colorScheme="blue">
          Create New Form
        </Button>
      </Flex>

      {/* Content */}
      <Flex w="full" justify="space-between" gap="6">
        {/* Form Management Section */}
        <Box flex="3" borderRadius="lg" p="6" shadow="lg" border="1px solid #A0BFE0">
          <Text fontSize="2xl" fontWeight="bold" mb="4" color="#4A55A2">
            Your Forms
          </Text>
          <Divider mb="4" />
          <SimpleGrid columns={[1, 2, 3]} spacing="6">
            {forms.length === 0 ? (
              <Text color="gray.500">No forms created yet.</Text>
            ) : (
              forms.map((form) => (
                <Box
                  key={form._id}
                  p="6"
                  borderRadius="lg"
                  shadow="lg"
                  bg="#A0BFE0"
                  border="1px solid #E2E8F0"
                  cursor="pointer"
                  _hover={{ transform: 'scale(1.05)', shadow: 'lg', bg: '#7895CB' }}
                  position="relative"
                  onClick={() => navigate(`/forms/${form._id}/details`)} // Navigate on form click
                >
                  <Flex justify="space-between" align="start">
                    <Text fontSize="3xl" fontWeight="semibold" mb="2" color="#4A55A2" fontFamily="Roboto, sans-serif">
                      {form.title}
                    </Text>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<FiMoreVertical />}
                        variant="ghost"
                        onClick={(e) => e.stopPropagation()} // Prevents card click when menu is clicked
                      />
                      <MenuList width="auto" minWidth="100px" p="0" boxShadow="lg" borderRadius="2">
                        <MenuItem
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click on menu item
                            handleDeleteForm(form._id);
                          }}
                          color="white"
                          backgroundColor="red.500"
                          p="2"
                          textAlign="center"
                          borderRadius="4"
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                  <Text fontSize="lg" mb="2" color="gray.600">
                    <strong>Description:</strong> {form.description}
                  </Text>
                  {/* Add Form Link here */}
                  {form.link && (
                    <Text fontSize="m" color="beige">
                     {' '}
                      <Link href={form.link} isExternal>
                        {form.link}
                      </Link>
                    </Text>
                  )}
                </Box>
              ))
            )}
          </SimpleGrid>
        </Box>

        {/* Submissions Overview Section */}
        <Box bg="#FADA7A" flex="1" borderRadius="lg" p="6" shadow="lg" border="1px solid #A0BFE0">
          <Text fontSize="xl" fontWeight="bold" mb="4" color="#4A55A2">
            Submissions Overview
          </Text>
          <Divider mb="4" />
          {forms.length === 0 ? (
            <Text color="gray.500">No submissions to display.</Text>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#4A90E2"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              {/* Form Names with Colors */}
              <Box mt="4">
                {chartData.map((entry, index) => (
                  <Flex key={index} align="center" mb="2">
                    <Box w="16px" h="16px" bg={COLORS[index % COLORS.length]} borderRadius="full" mr="2"></Box>
                    <Text fontSize="sm" color="#333" fontWeight="bold">
                      {entry.name}
                    </Text>
                  </Flex>
                ))}
              </Box>
              <Divider my="4" />
              <Text fontSize="lg" color="#333" textAlign="center">
                Total Interactions: <span style={{ color: '#001A6E' }}>{totalSubmissions}</span>
              </Text>
            </>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
