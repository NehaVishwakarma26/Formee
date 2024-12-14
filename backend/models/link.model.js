const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  link: { type: String, required: true, unique: true },
});

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;
