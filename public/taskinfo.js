import { sendRequest } from "./module.js";

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
	const { task } = await sendRequest(`/api/v1/tasks/${id}`);
	taskHolder = task;
	console.log(task);
	const { _id: taskId, title, isComplete } = task;
	if (!task) {
		idDiv.innerHTML = "not found";
		editInput.innerHTML = "not found";
		return;
	}
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
		successNotify.style.display = "block";
		setTimeout(() => {
			successNotify.style.display = "none";
		}, 2000);
		taskHolder.title = newTitle;
		taskHolder.isComplete = isComplete;
		window.location.replace("index.html");
	} else {
		failedNotify.innerHTML = `Failed, ${msg} !`;
		failedNotify.style.display = "block";
		setTimeout(() => {
			failedNotify.style.display = "none";
		}, 2000);
		editInput.value = taskHolder.title;
	}
}
