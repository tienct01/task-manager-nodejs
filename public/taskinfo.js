import { displayNotify, sendRequest } from "./module.js";

const idDiv = document.querySelector(".task-id .id");
const form = document.querySelector("#edit-form");
const editInput = document.querySelector(".form-edit #edit-input");
const completeCbox = document.querySelector("#complete-input");
const successNotify = document.querySelector(".success-notify");
const failedNotify = document.querySelector(".failed-notify");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let taskHolder;
getTaskAndRender();
form.addEventListener("submit", updateTask);

async function getTaskAndRender() {
	const { task, msg } = await sendRequest(`/api/v1/tasks/${id}`);
	console.log(task);
	taskHolder = task;
	if (!task) {
		idDiv.innerHTML = "not found";
		editInput.value = "not found";
		return;
	}
	const { _id: taskId, title, isComplete } = task;
	idDiv.innerHTML = taskId;
	editInput.value = title;
	completeCbox.checked = isComplete;
}
async function updateTask(event) {
	event.preventDefault();

	let newTitle = editInput.value;
	let isComplete = completeCbox.checked;
	if (idDiv.innerHTML === "not found") {
		return;
	}
	const { task, msg } = await sendRequest(`/api/v1/tasks/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title: newTitle, isComplete: isComplete }),
	});
	if (task) {
		displayNotify(successNotify);
		taskHolder.title = newTitle;
		taskHolder.isComplete = isComplete;
		window.location.replace("index.html");
	} else {
		failedNotify.innerHTML = `Failed, ${msg} !`;
		displayNotify(failedNotify);
		editInput.value = taskHolder.title;
	}
}
