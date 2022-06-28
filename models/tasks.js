const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "phai dien vao"],
			trim: true,
		},
		isComplete: {
			type: Boolean,
			default: false,
		},
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("Task", taskSchema);
