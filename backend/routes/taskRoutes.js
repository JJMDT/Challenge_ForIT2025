const express = require('express');
const router = express.Router();
const {createTask,deleteTask,getAllTasks,updateTask} = require('../controllers/taskController')

router.get('/', getAllTasks)
router.post('/', createTask)
router.delete('/:id', deleteTask)
router.put('/:id',updateTask)

module.exports = router