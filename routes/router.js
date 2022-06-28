const express = require("express");
const router = express.Router();

const {
	getAllTasks,
	getSingleTask,
	createTask,
	updateTask,
	deleteTask,
} = require("../controllers/tasks");

// get and create task api/v1/tasks
router.route("/").get(getAllTasks).post(createTask);
// get single task, update task
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask);
module.exports = router;
