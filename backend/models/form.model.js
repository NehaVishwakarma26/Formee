const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fields: [
    {
      type: { type: String, required: true },
      label: { type: String, required: true },
      placeholder: { type: String },
      options: { type: [String] },
      required: { type: Boolean, required: true },
      defaultValue: { type: String },
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Form = mongoose.model('Form', formSchema);
module.exports = Form;
