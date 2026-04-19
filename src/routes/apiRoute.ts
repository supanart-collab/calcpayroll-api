import { Router } from 'express';
import * as apiController from "../controllers/apiController";
import validateMiddlewares from "../middlewares/validateMiddlewares";
import { calcPayrollValidator } from "../validators/calcPayrollValidator"

const router = Router();

router.get('/employees', apiController.getEmployees);
router.post('/payroll/calculate', calcPayrollValidator, validateMiddlewares, apiController.calcPayroll);

export default router;