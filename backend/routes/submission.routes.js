const express = require('express');
const Submission = require('../models/submission.model');

const router = express.Router();

// Create a new submission (No authentication needed)
router.post('/:formId', async (req, res) => {
  const { formId } = req.params;
  const { data } = req.body;

  try {
    const submission = new Submission({
      formId,
      data, // Store form responses
    });

    await submission.save(); // Save submission
    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get submissions for a specific form (No authentication needed)
router.get('/:formId', async (req, res) => {
  try {
    const submissions = await Submission.find({ formId: req.params.formId });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
