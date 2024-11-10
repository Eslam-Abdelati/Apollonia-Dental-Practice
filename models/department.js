const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      unique: [true, "This name already exists. Check for a different name"],
      trim: true,
      minlength: [3, "Department name must be at least 3 characters long"],
    },
    description: {
      type: String,
      required: [true, "Department description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
    },
    numOfEmployees: {
      type: Number,
      required: [true, "Number of employees is required"],
      min: [1, "Number of employees cannot be less than 1"],
    },
    subDepartments: [
      {
        type: String,
        trim: true,
      },
    ],
    location: {
      type: String,
      required: [true, "Location is required"], // التأكد من أن الموقع مطلوب
      trim: true,
    },
    employees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    }]
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
