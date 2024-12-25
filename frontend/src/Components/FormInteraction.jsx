import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  RadioGroup,
  Radio,
  Stack,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FormInteraction = () => {
  const { formId } = useParams(); // Extract formId from URL
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');



  // Fetch form details on component load
  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await axios.get(`https://formee.onrender.com/api/forms/${formId}`);
        console.log('Fetched form:', response.data);
        setForm(response.data); // Save form details in state
      } catch (error) {
        console.error('Error fetching form details:', error);
        setError('Failed to load the form. Please try again.');
      }
    };

    fetchFormDetails();
  }, [formId]);

  // Handle form input changes
  const handleChange = (e, fieldName) => {
    setResponses({ ...responses, [fieldName]: e.target.value });
  };

  const handleSelectChange = (value, fieldName) => {
    setResponses({ ...responses, [fieldName]: value });
  };

  // Submit form responses
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(''); // Reset error before checking

    // Validation for required fields
    for (let field of form.fields) {
      if (field.required && !responses[field.label]) {
        setFormError(`${field.label} is required.`);
        return; // Stop form submission if any required field is empty
      }
    }

    try {
      // Submit form responses to the correct route (no token needed)
      await axios.post(
        `https://formee.onrender.com/api/submissions/${formId}`, // Correct route for submissions
        { data: responses }
      );

      setMessage('Form submitted successfully!');
      setError('');
      setResponses({}); // Clear responses after submission
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form. Please try again.');
      setMessage('');
    }
  };

  // Display loading state if form is not yet loaded
  if (!form) {
    return (
      <Box maxW="md" mx="auto" mt="10" p="4" boxShadow="md" borderRadius="md" bg="gray.50">
        <Text fontSize="lg">Loading...</Text>
        {error && <Text color="red.500" mt="2">{error}</Text>}
      </Box>
    );
  }

  return (
    <Box maxW="md" mx="auto" mt="10" p="6" boxShadow="lg" borderRadius="md" bg="white">
      <Text fontSize="3xl" mb="6" textAlign="center" fontWeight="bold" color="#4A55A2">
        {form.title}
      </Text>
      <Text mb="4" color="gray.600" textAlign="center">
        {form.description}
      </Text>

      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          {form.fields.map((field, index) => (
            <FormControl key={index} isRequired={field.required} mb="4">
              <FormLabel>{field.label}</FormLabel>
              {field.type === 'select' ? (
                <Select
                  placeholder={`Select ${field.label}`}
                  value={responses[field.label] || ''}
                  onChange={(e) => handleSelectChange(e.target.value, field.label)}
                  borderColor="#A0BFE0"
                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              ) : field.type === 'radio' ? (
                <RadioGroup
                  onChange={(value) => handleSelectChange(value, field.label)}
                  value={responses[field.label] || ''}
                >
                  <Stack direction="column">
                    {field.options.map((option, idx) => (
                      <Radio key={idx} value={option}>
                        {option}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              ) : (
                <Input
                  type={field.type}
                  placeholder={`Enter ${field.label}`}
                  value={responses[field.label] || ''}
                  onChange={(e) => handleChange(e, field.label)}
                  borderColor="#A0BFE0"
                />
              )}
            </FormControl>
          ))}
          <Button type="submit" colorScheme="blue" width="full" mt="4" >
            Submit
          </Button>
        </VStack>
      </form>

      {message && <Text color="green.500" mt="4" textAlign="center">{message}</Text>}
      {error && <Text color="red.500" mt="4" textAlign="center">{error}</Text>}
      {formError && <Text color="red.500" mt="4" textAlign="center">{formError}</Text>} {/* Error message for missing required fields */}
    </Box>
  );
};

export default FormInteraction;
