const mongoose = require('mongoose');
// main employee Schema
const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  employeeType: {
    type: String,
    enum: ['HR', 'Normal'],
    required: true
  },
  group: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  date: [
    {
      type: Date
    }
  ]
});

module.exports = mongoose.model('Employee', employeeSchema);
