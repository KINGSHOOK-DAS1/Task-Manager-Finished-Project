const express = require("express");
const {getTasks, createTask, updateTask, deleteTask} = require("../Controller/taskController")

const router = express.Router()

router.get('/', getTasks);
router.post('/createTask', createTask);
router.put('/:id',updateTask);
router.delete('/:id', deleteTask);


module.exports = router