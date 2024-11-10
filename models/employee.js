const mongoose = require('mongoose');

// تعريف Schema للموظف
const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department', 
    required: true
  },
  position: {
    type: String,
    required: true
  },
  dateOfHire: {
    type: Date,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    required: true
  },
  specializations: {
    type: [String], 
    default: []
  },
  trainings: {
    type: [String],  
    default: []
  }
});

// حساب العمر بناءً على تاريخ الميلاد
// employeeSchema.virtual('age').get(function() {
//   const diff = Date.now() - this.dateOfBirth.getTime();
//   const ageDate = new Date(diff);
//   return Math.abs(ageDate.getUTCFullYear() - 1970);
// });


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
