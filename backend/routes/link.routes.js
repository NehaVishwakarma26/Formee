const express = require('express');
const Link = require('../models/link.model');
const Form = require('../models/form.model');
const authenticate = require('../middleware_m/auth.middleware'); // Optional: For authentication middleware
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // To generate unique links

// Generate a new link for a form
router.post('/', authenticate, async (req, res) => {
  const { formId } = req.body;

  try {
    // Check if the form exists
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Generate a unique link (you can use UUID or any unique string generation method)
   const link = `https://formeeformbuilder.netlify.app/form/${uuidv4()}` ;

    // Create a new Link
    const newLink = new Link({
      formId,
      link,
    });

    // Save the link in the database
    await newLink.save();

    res.status(201).json(newLink); // Return the created link
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get link(s) for a specific form using the form ID
router.get('/:formId', authenticate, async (req, res) => {
  const { formId } = req.params;

  try {
    // Find the link associated with the form ID
    const links = await Link.find({ formId });

    if (!links || links.length === 0) {
      return res.status(404).json({ message: 'No link found for this form' });
    }

    res.status(200).json(links); // Return the link(s) for the form
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
