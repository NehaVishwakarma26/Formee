const express = require('express');
const Form = require('../models/form.model');
const Link = require('../models/link.model');  // Assuming you have a Link model to store generated links
const authenticate = require('../middleware_m/auth.middleware'); // Middleware for authentication
const { v4: uuidv4 } = require('uuid'); // Import uuid to generate unique links
const router = express.Router();

// Create a new form
router.post('/', authenticate, async (req, res) => {
  const { title, description, fields } = req.body;
  const userId = req.user.userId; // Extracted from the JWT token

  try {
    const newForm = new Form({ title, description, fields, userId });
    await newForm.save();
    res.status(201).json(newForm); // Respond with the created form
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all forms (for an authenticated user)
router.get('/', authenticate, async (req, res) => {
  const userId = req.user.userId; // Extracted from JWT token

  try {
    const forms = await Form.find({ userId }); // Find forms created by the logged-in user
    res.status(200).json(forms); // Respond with the list of forms
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a form by ID (Public Access - No Authentication Needed)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const form = await Form.findById(id); // Find form by ID
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(form); // Respond with the form details
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update a form by ID
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, description, fields } = req.body;

  try {
    const updatedForm = await Form.findByIdAndUpdate(id, { title, description, fields }, { new: true });
    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a form by ID
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedForm = await Form.findByIdAndDelete(id);
    if (!deletedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:formId/link', authenticate, async (req, res) => {
  const { formId } = req.params;
  
  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    const link = `https://formeeformbuilder.netlify.app/form/${formId}`; // Point to frontend URL

    const newLink = new Link({
      formId,
      link,
    });

    await newLink.save();

    res.status(201).json(newLink); // Return the created link
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:formId/link', authenticate, async (req, res) => {
  const { formId } = req.params;

  try {
    const links = await Link.find({ formId }); // Find the link for the given form ID
    if (!links || links.length === 0) {
      return res.status(404).json({ message: 'No link found for this form' });
    }

    res.status(200).json(links); // Return the link(s) for the form
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
