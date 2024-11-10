const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const Department = require("../models/department");
const Employee = require('../models/employee')

exports.createEmployee = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    age,
    address,
    phoneNumber,
    email,
    departmentName,
    position,
    dateOfHire,
    salary,
    gender,
    maritalStatus,
    specializations,
    trainings
  } = req.body;

  // تحقق من وجود القسم في قاعدة البيانات
  const department = await Department.findOne({ name: departmentName });
  if (!department) {
    return next(new AppError(`Department with name ${departmentName} not found`, 404));
  }

  // إنشاء موظف جديد
  const newEmployee = new Employee({
    firstName,
    lastName,
    dateOfBirth,
    age,
    address,
    phoneNumber,
    email,
    department: department._id,
    position,
    dateOfHire,
    salary,
    gender,
    maritalStatus,
    specializations,
    trainings
  });

  // حفظ الموظف في قاعدة البيانات
  await newEmployee.save();

  // إضافة الموظف إلى القسم
   department.employees.push(newEmployee._id);
   await department.save();

  res.status(201).json({
    status: "success",
    data: newEmployee,
  });
});

exports.getAllEmployee = asyncHandler(async (req, res, next) => {
  const employee = await Employee.find();

  res.status(200).json({
    status: "success",
    result: employee.length,
    data: {
      employee,
    },
  });
});


exports.getEmployee = asyncHandler(async (req, res, next) => {
  const employeeID = req.params.id;
  const employee = await Employee.findById(employeeID).populate('department');
  if (!employee) {
    return next(
      new AppError(`cant find this employee for ID ${employeeID}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      employee,
    },
  });
});


exports.updateEmployee = asyncHandler(async (req, res, next) => {
  const employeeID = req.params.id;
  const employee = await Employee.findByIdAndUpdate(
    employeeID,
    req.body,
    { new: true, runValidators: true }
  );
  if (!employee) {
    return next(
      new AppError(`cant find this employee for ID ${employeeID}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      employee,
    },
  });
});


exports.deleteEmployee = asyncHandler(async (req, res, next) => {
  const employeeID = req.params.id;
  const employee = await Employee.findByIdAndDelete(employeeID);
  if (!employee) {
    return next(
      new AppError(`cant find this employee for ID ${employeeID}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});