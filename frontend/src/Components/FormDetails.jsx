import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Checkbox,
  SimpleGrid,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FormDetails = ({ token }) => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch form details on page load
  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await axios.get(`https://formee.onrender.com/api/forms/${formId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching form details:', error);
      }
    };

    if (formId && token) {
      fetchFormDetails();
    }
  }, [formId, token]);

  // Handle field changes (for text, radio, select, etc.)
  const handleFieldChange = (e, index, fieldName) => {
    const { value } = e.target;

    // Handle 'values' field (comma separated for radio/select)
    if (fieldName === 'values') {
      const updatedFields = form.fields.map((field, i) =>
        i === index ? { ...field, [fieldName]: value.split(',').map(v => v.trim()) } : field // Split and trim values
      );
      setForm({ ...form, fields: updatedFields });
    } else {
      const updatedFields = form.fields.map((field, i) =>
        i === index ? { ...field, [fieldName]: value } : field
      );
      setForm({ ...form, fields: updatedFields });
    }
  };

  // Add new field to the form
  const addField = () => {
    setForm({
      ...form,
      fields: [
        ...form.fields,
        { label: '', type: 'text', required: false, placeholder: '', values: [] },
      ],
    });
  };

  // Remove a field from the form
  const removeField = (index) => {
    const updatedFields = form.fields.filter((_, i) => i !== index);
    setForm({ ...form, fields: updatedFields });
  };

  // Save form changes to the database
  const saveChanges = async () => {
    try {
      await axios.put(
        `https://formee.onrender.com/api/forms/${formId}`,
        { title: form.title, description: form.description, fields: form.fields },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  // Loading state when form is not yet loaded
  if (!form) {
    return (
      <Box maxW="md" mx="auto" mt="10" p="4" boxShadow="md" borderRadius="md" bg="gray.50">
        <Text>Loading...</Text>
      </Box>
    );
  }

  // Count the number of field types in the form
  const fieldTypesCount = form.fields.reduce(
    (acc, field) => {
      acc[field.type] = (acc[field.type] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <Flex direction="column" align="center" p="8" fontFamily="Poppins, sans-serif">
      {/* Header */}
      <Flex justify="space-between" align="center" w="full" mb="8">
        <Text fontSize="xl" fontStyle="italic" fontWeight="bold" color="#4A55A2" fontFamily="Poppins, sans-serif">
          Forming your future, one submission at a time!
        </Text>

        {/* Edit and View Submissions Buttons */}
        <Flex gap="6">
          <Button
            onClick={isEditing ? saveChanges : () => setIsEditing(true)}
            colorScheme={isEditing ? 'green' : 'blue'}
          >
            {isEditing ? 'Save Changes' : 'Edit Form'}
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => navigate(`/forms/${formId}/submissions`)}
          >
            View Submissions
          </Button>
        </Flex>
      </Flex>

      {/* Content */}
      <Flex w="full" justify="space-between" gap="6">
        {/* Left: Form Editing Section */}
        <Box flex="2" borderRadius="lg" p="6" shadow="lg" bg="white" border="1px solid #A0BFE0">
          <Text fontSize="2xl" fontWeight="bold" mb="4" color="#4A55A2">
            {form.title}
          </Text>

          {/* Form Title and Description */}
          <FormControl mb="4">
            <FormLabel>Form Title</FormLabel>
            <Input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              disabled={!isEditing}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Form Description</FormLabel>
            <Input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              disabled={!isEditing}
            />
          </FormControl>

          {/* Fields Section */}
          <Text fontWeight="bold" mb="4">
            Fields:
          </Text>
          <VStack spacing={4} align="stretch">
            {form.fields.map((field, index) => (
              <Box key={index} p="4" borderRadius="md" borderWidth="1px" bg="white">
                <FormControl mb="2">
                  <FormLabel>Label</FormLabel>
                  <Input
                    type="text"
                    value={field.label}
                    onChange={(e) => handleFieldChange(e, index, 'label')}
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormControl mb="2">
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={field.type}
                    onChange={(e) => handleFieldChange(e, index, 'type')}
                    disabled={!isEditing}
                  >
                    <option value="text">Text</option>
                    <option value="select">Dropdown</option>
                    <option value="radio">Radio</option>
                    <option value="date">Date</option>
                    <option value="number">Number</option>
                  </Select>
                </FormControl>
                {(field.type === 'select' || field.type === 'radio') && (
                  <FormControl mb="2">
                    <FormLabel>Field Values (Comma separated)</FormLabel>
                    <Input
                      type="text"
                      value={field.values ? field.values.join(', ') : ''}
                      onChange={(e) => handleFieldChange(e, index, 'values')}
                      disabled={!isEditing}
                    />
                  </FormControl>
                )}
                {field.type === 'text' || field.type === 'number' ? (
                  <FormControl mb="2">
                    <FormLabel>Placeholder</FormLabel>
                    <Input
                      type="text"
                      value={field.placeholder}
                      onChange={(e) => handleFieldChange(e, index, 'placeholder')}
                      disabled={!isEditing}
                    />
                  </FormControl>
                ) : null}
                <FormControl mb="2">
                  <Checkbox
                    isChecked={field.required}
                    onChange={(e) =>
                      handleFieldChange({ target: { value: e.target.checked } }, index, 'required')
                    }
                    disabled={!isEditing}
                  >
                    Required
                  </Checkbox>
                </FormControl>
                {isEditing && (
                  <Button colorScheme="red" onClick={() => removeField(index)}>
                    Remove Field
                  </Button>
                )}
              </Box>
            ))}
          </VStack>

          {/* Add New Field Button */}
          {isEditing && (
            <Button colorScheme="blue" mt="4" onClick={addField}>
              Add Field
            </Button>
          )}
        </Box>

        {/* Right: Form Summary Section */}
        <Box flex="1" borderRadius="lg" p="6" shadow="lg" bg="#F0F4F8" border="1px solid #A0BFE0">
          <Text fontSize="2xl" fontWeight="bold" mb="4" color="#4A55A2">
            Form Summary
          </Text>
          <Text fontSize="xl" fontWeight="bold" mb="2">
            {form.title}
          </Text>
          <Text mb="4">{form.description}</Text>

          {/* Field Type Summary */}
          <Text fontWeight="bold" mb="4">
            Field Types Summary:
          </Text>
          <VStack align="start" spacing="2">
            {Object.keys(fieldTypesCount).map((type) => (
              <Text key={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}: {fieldTypesCount[type]} fields
              </Text>
            ))}
          </VStack>

          {/* Display Fields */}
          <Text fontWeight="bold" mt="4" mb="3">Fields:</Text>
          {form.fields.map((field, index) => (
            <Box key={index} mb="1">
              <Text>{field.label}</Text>
              <Text>{field.placeholder || 'No placeholder'}</Text>
              {field.type === 'radio' || field.type === 'select' ? (
                <Text>{`Values: ${field.values ? field.values.join(', ') : 'No values specified'}`}</Text>
              ) : null}
            </Box>
          ))}
        </Box>
      </Flex>
    </Flex>
  );
};

export default FormDetails;
