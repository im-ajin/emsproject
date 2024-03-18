import express from 'express';
import { createemployee, getEmployees, getEmployee, editEmployee, deleteEmployee} from '../controllers/employee.controller.js';

const router = express.Router();

router.post('/create', createemployee);
router.get('/getEmployees', getEmployees);
router.get('/getEmployee/:id', getEmployee);
router.put('/editEmployee/:id', editEmployee);
router.delete('/deleteEmployee/:id', deleteEmployee);


export default router;