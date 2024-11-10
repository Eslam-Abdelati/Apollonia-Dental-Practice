const express = require("express");
const departmentController = require("../controller/department");

const router = express.Router();

router
  .route("/")
  .post(departmentController.creatDepartment)
  .get(departmentController.getAllDepartment);

router
  .route("/:id")
  .get(departmentController.getDepartment)
  .patch(departmentController.updateDepartment)
  .delete(departmentController.deleteDepartment);

module.exports = router;
