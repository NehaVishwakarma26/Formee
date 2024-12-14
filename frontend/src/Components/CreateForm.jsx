import React, { useState } from 'react';
import { Box, Text, Button, Input, FormControl, FormLabel, VStack, Checkbox, HStack } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, SaveIcon, LinkIcon } from '@chakra-ui/icons';
import axios from 'axios';

const CreateForm = ({ token }) => {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [fields, setFields] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [formLink, setFormLink] = useState('');

  // Add a new field of a specific type
  const addField = (type) => {
    const newField = {
      id: new Date().getTime(),
      type,
      label: '',
      placeholder: type !== 'radio' && type !== 'date' ? 'Enter value' : '',
      required: false,
      options: type === 'select' || type === 'radio' ? ['Option 1', 'Option 2'] : [],
    };
    setFields([...fields, newField]);
  };

  // Remove a field by ID
  const removeField = (id) => {
    const updatedFields = fields.filter((field) => field.id !== id);
    setFields(updatedFields);
  };

  // Update field properties like label, placeholder, etc.
  const handleFieldChange = (e, id) => {
    const { name, value } = e.target;
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, [name]: value } : field
    );
    setFields(updatedFields);
  };

  // Handle checkbox change for required field
  const handleCheckboxChange = (e, id) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, required: e.target.checked } : field
    );
    setFields(updatedFields);
  };

  // Add a new option for dropdown or radio fields
  const addOption = (id) => {
    const updatedFields = fields.map((field) =>
      field.id === id
        ? { ...field, options: [...field.options, `Option ${field.options.length + 1}`] }
        : field
    );
    setFields(updatedFields);
  };

  // Update dropdown or radio options
  const handleOptionChange = (e, fieldId, optionIndex) => {
    const updatedFields = fields.map((field) =>
      field.id === fieldId
        ? {
            ...field,
            options: field.options.map((option, idx) =>
              idx === optionIndex ? e.target.value : option
            ),
          }
        : field
    );
    setFields(updatedFields);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: formTitle,
      description: formDescription,
      fields,
    };

    try {
      const response = await axios.post('https://formee.onrender.com/api/forms', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formId = response.data._id;

      // Generate a link for the created form
      const linkResponse = await axios.post(
        `https://formee.onrender.com/api/forms/${formId}/link`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFormLink(linkResponse.data.link);
      setMessage('Form created successfully!');
      setError('');
      setFields([]);
      setFormTitle('');
      setFormDescription('');
    } catch (err) {
      console.error('Error creating form:', err);
      setError('Error creating form or generating link');
      setMessage('');
    }
  };

  return (
    <HStack spacing={4} justify="space-between" align="start" minH="100vh" p="4">
      {/* Left Section - Form Fields Buttons */}
      <Box w="20%" position="sticky" top="10" align="start">
        <VStack spacing={4} align="stretch">
          <Button leftIcon={<AddIcon />} onClick={() => addField('text')} colorScheme="blue" width="full">
            Add Text Field
          </Button>
          <Button leftIcon={<AddIcon />} onClick={() => addField('number')} colorScheme="blue" width="full">
            Add Number Field
          </Button>
          <Button leftIcon={<AddIcon />} onClick={() => addField('date')} colorScheme="blue" width="full">
            Add Date Picker
          </Button>
          <Button leftIcon={<AddIcon />} onClick={() => addField('select')} colorScheme="blue" width="full">
            Add Dropdown
          </Button>
          <Button leftIcon={<AddIcon />} onClick={() => addField('radio')} colorScheme="blue" width="full">
            Add Radio Buttons
          </Button>
        </VStack>
      </Box>

      {/* Center Section - Form Fields */}
      <Box w="60%" overflowY="auto" p="4" borderRadius="md" boxShadow="md" bg="white">
        <Text fontSize="2xl" mb="4" textAlign="center" fontWeight="bold">
          Create New Form
        </Text>

        <FormControl mb="4">
          <FormLabel>Form Title</FormLabel>
          <Input
            type="text"
            placeholder="Form Title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Form Description</FormLabel>
          <Input
            type="text"
            placeholder="Form Description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
          />
        </FormControl>

        {/* Display added fields */}
        {fields.map((field) => (
          <Box key={field.id} p="4" mb="4" borderRadius="md" borderWidth="1px" bg="gray.50">
            <FormControl>
              <FormLabel>Label</FormLabel>
              <Input
                type="text"
                value={field.label}
                name="label"
                placeholder="Field Label"
                onChange={(e) => handleFieldChange(e, field.id)}
              />
            </FormControl>

            <FormControl mt="4">
              <Checkbox
                isChecked={field.required}
                onChange={(e) => handleCheckboxChange(e, field.id)}
              >
                Required
              </Checkbox>
            </FormControl>

            {(field.type === 'select' || field.type === 'radio') && (
              <FormControl mt="4">
                <FormLabel>Options</FormLabel>
                {field.options.map((option, idx) => (
                  <Input
                    key={idx}
                    value={option}
                    placeholder={`Option ${idx + 1}`}
                    onChange={(e) => handleOptionChange(e, field.id, idx)}
                    mt="2"
                  />
                ))}
                <Button mt="2" leftIcon={<AddIcon />} colorScheme="blue" onClick={() => addOption(field.id)}>
                  Add Option
                </Button>
              </FormControl>
            )}

            {field.type !== 'radio' && field.type !== 'date' && (
              <FormControl mt="4">
                <Input
                  value={field.placeholder}
                  name="placeholder"
                  placeholder="Field Placeholder"
                  onChange={(e) => handleFieldChange(e, field.id)}
                />
              </FormControl>
            )}

            <Button
              mt="4"
              leftIcon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => removeField(field.id)}
            >
              Remove Field
            </Button>
          </Box>
        ))}
      </Box>

      {/* Right Section - Action Buttons */}
      <Box w="20%" position="sticky" top="10">
        <VStack spacing={4} align="stretch">
          <Button colorScheme="green" width="full" onClick={handleSubmit}>
            Save Form
          </Button>
          <Button leftIcon={<DeleteIcon />} colorScheme="gray" width="full" onClick={() => window.location.reload()}>
            Clear Form
          </Button>
          {formLink && (
            <Box mt="4">
              <Text fontWeight="bold">Form Link:</Text>
              <Text>{formLink}</Text>
              <Button mt="2" leftIcon={<LinkIcon />} colorScheme="blue" onClick={() => navigator.clipboard.writeText(formLink)}>
                Copy Link
              </Button>
            </Box>
          )}
        </VStack>
      </Box>
    </HStack>
  );
};

export default CreateForm;
