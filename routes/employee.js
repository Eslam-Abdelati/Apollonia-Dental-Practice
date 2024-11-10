const express = require("express");
const employeeController = require("../controller/employee");

const router = express.Router();

router
  .route("/")
  .post(employeeController.createEmployee)
  .get(employeeController.getAllEmployee);

router
  .route("/:id")
  .get(employeeController.getEmployee)
  .patch(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

module.exports = router;
