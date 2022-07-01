const Task = require("../models/tasks");
const asyncWrapper = require("../middleware/async-wrapper");
const { CustomAPIError } = require("../errors/custom-api-error");

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find();
	res.status(200).json(tasks);
});

const createTask = asyncWrapper(async (req, res) => {
	const { title, isComplete } = req.body;
	let task = await Task.create({ title: title, isComplete: isComplete });
	res.status(201).json({ task });
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;
	const task = await Task.findById(id);
	if (!task) {
		return next(new CustomAPIError(`No task with id: ${id}`, 404));
	}
	res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;
	const payload = req.body;
	const task = await Task.findByIdAndUpdate(id, payload, {
		// Return obj sau update thay vi truoc update
		new: true,
		// doi chieu validator o Schema
		runValidators: true,
	});
	if (!task) {
		return next(new CustomAPIError(`No task with id: ${id}`, 404));
	}
	res.status(200).json({ task });
});
const deleteTask = async (req, res, next) => {
	const { id } = req.params;
	const task = await Task.findByIdAndDelete(id);
	if (!task) {
		return next(new CustomAPIError(`No task with this id: ${id}`, 404));
	}
	res.status(200).json({ task });
};
module.exports = {
	getAllTasks,
	getSingleTask,
	createTask,
	updateTask,
	deleteTask,
};
