const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  data: { type: Map, of: mongoose.Schema.Types.Mixed, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;
