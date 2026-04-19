import { body } from "express-validator";

export const calcPayrollValidator = [
    body("employeeId")
    .notEmpty()
    .withMessage("employeeId is required")
    .isInt()
    .withMessage("employeeId must be a number"),
  body("workDate").isArray().withMessage("workDate must be an array")
]