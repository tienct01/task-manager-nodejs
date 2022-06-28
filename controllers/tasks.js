const Task = require("../models/tasks");
const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find();
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};
const createTask = async (req, res) => {
	try {
		const { title, isComplete } = req.body;
		Task.create({ title: title, isComplete: isComplete }, (err, result) => {
			if (err) {
				// Neu co error thi tra ve obj err
				let errName = err.errors.title.name;
				let msg;
				switch (errName) {
					case "ValidatorError":
						msg = "Khong duoc de trong title";
						break;
					default:
						msg = err;
						break;
				}
				return res.status(400).json({ msg });
			}
			// Neu khong co error xay ra thi tra ve task vua dc create
			res.status(201).json({
				task: result,
			});
		});
	} catch (error) {
		let msg;
		switch (error.name) {
			default:
				msg = error;
		}
		res.status(500).json({ msg });
	}
};
const getSingleTask = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await Task.findById(id);
		if (!task) {
			return res.status(404).json({ msg: `No task with id: ${id}` });
		}
		res.status(200).json({ task });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};
const updateTask = async (req, res) => {
	try {
		const { id } = req.params;
		const payload = req.body;
		const task = await Task.findByIdAndUpdate(id, payload, {
			// Return obj sau update thay vi truoc update
			new: true,
			// doi chieu validator o Schema
			runValidators: true,
		});

		if (!task) {
			return res.status(404).json({ msg: `No task with id: ${id}` });
		}
		res.status(200).json({ task });
	} catch (error) {
		let msg;
		switch (error.name) {
			case "CastError":
				msg = "ID khong hop le";
				break;
			case "ValidationError":
				msg = "Khong duoc de title trong";
				break;
			default:
				msg = error;
		}
		// Loi trong noi bo server 500
		res.status(500).json({ msg });
	}
};
const deleteTask = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await Task.findByIdAndDelete(id);
		if (!task) {
			return res.status(404).json({ msg: `No task with this id: ${id}` });
		}
		res.status(200).json({ task });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};
module.exports = {
	getAllTasks,
	getSingleTask,
	createTask,
	updateTask,
	deleteTask,
};
