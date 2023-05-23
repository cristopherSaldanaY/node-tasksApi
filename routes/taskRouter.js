const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate-fields');


router.get('/', taskController.getAllTasks);

router.post('/', [ check('name', 'El campo name es requerido').not().isEmpty()], validateField, taskController.createTask);

router.put('/:id', [check('name', 'El campo name es requerido').not().isEmpty()], validateField,  taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;
