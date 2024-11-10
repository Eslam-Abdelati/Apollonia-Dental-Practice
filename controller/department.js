const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const Department = require("../models/department");

exports.creatDepartment = asyncHandler(async (req, res) => {
  const { name, description, numOfEmployees, subDepartments, location } = req.body;
  const newDepartment = new Department({
    name,
    description,
    numOfEmployees,
    subDepartments,
    location,
  });
  await newDepartment.save();
  res.status(201).json({
    status: "success",
    data: {
      newDepartment,
    },
  });
});

exports.getAllDepartment = asyncHandler(async (req, res, next) => {
  const department = await Department.find();
  if(!department){
    return next(new AppError('cant find any ',404))
  }
  res.status(200).json({
    status: "success",
    result: department.length,
    data: {
      department,
    },
  });
});

exports.getDepartment = asyncHandler(async (req, res, next) => {
  const departmentId = req.params.id;
  const department = await Department.findById(departmentId);
  if (!department) {
    return next(
      new AppError(`cant find this department for ID ${departmentId}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      department,
    },
  });
});

exports.updateDepartment = asyncHandler(async (req, res, next) => {
  const departmentId = req.params.id;
  const department = await Department.findByIdAndUpdate(
    departmentId,
    req.body,
    { new: true, runValidators: true }
  );
  if (!department) {
    return next(
      new AppError(`cant find this department for ID ${departmentId}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      department,
    },
  });
});

exports.deleteDepartment = asyncHandler(async (req, res, next) => {
  const departmentId = req.params.id;
  const department = await Department.findByIdAndDelete(departmentId);
  if (!department) {
    return next(
      new AppError(`cant find this department for ID ${departmentId}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
