import { sendRequest } from "./module.js";

const inputTask = document.querySelector("#input-task");
const submitBtn = document.querySelector(".submit");
const taskForm = document.querySelector("#task-form");
const getTaskAlert = document.querySelector(".get-task-alert");
const taskContainer = document.querySelector(".task-container");
const successNotify = document.querySelector(".success-notify");
const failedNotify = document.querySelector(".failed-notify");

taskForm.addEventListener("submit", createTask);
getAllTasks();

// window.addEventListener("pageshow", function (event) {
// 	var historyTraversal =
// 		event.persisted ||
// 		(typeof window.performance != "undefined" &&
// 			window.performance.navigation.type === 2);
// 	if (historyTraversal) {
// 		// Handle page restore.
// 		window.location.reload();
// 	}
// });

function deleteAll() {
	while (taskContainer.firstChild) {
		taskContainer.removeChild(taskContainer.lastChild);
	}
}
function renderTask(tasks) {
	tasks.map(({ _id, title, isComplete }) => {
		const taskItem = document.createElement("div");
		taskItem.className = "task-item";

		const taskTitle = document.createElement("div");
		taskTitle.className = "task-title";
		taskTitle.innerHTML = title;
		if (isComplete) {
			taskTitle.className += " " + "line-through";
		}

		const btnEdit = document.createElement("div");
		btnEdit.className = "btn-edit";
		btnEdit.innerHTML = `<a href="taskinfo.html?id=${_id}"/><i class="demo-icon icon-pencil-squared"></i>`;

		const btnDelete = document.createElement("div");
		btnDelete.className = "btn-delete";
		btnDelete.innerHTML = '<i class="demo-icon icon-trash"></i>';
		btnDelete.addEventListener("click", () => deleteTask(_id));

		taskItem.append(taskTitle, btnEdit, btnDelete);
		taskContainer.appendChild(taskItem);
	});
}

async function getAllTasks() {
	let tasks = [];
	let response = await sendRequest("/api/v1/tasks");
	tasks = response;
	deleteAll();
	renderTask(tasks);
}

async function createTask(event) {
	event.preventDefault();

	let inputStr = inputTask.value;

	let { msg, task } = await sendRequest("/api/v1/tasks", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title: inputStr }),
	});
	if (task) {
		successNotify.style.display = "block";
		setTimeout(() => {
			successNotify.style.display = "none";
		}, 2000);
		renderTask([task]);
		inputTask.value = "";
	} else {
		failedNotify.innerHTML = `Failed, ${msg} !`;
		failedNotify.style.display = "block";
		setTimeout(() => {
			failedNotify.style.display = "none";
		}, 2000);
	}
}

async function deleteTask(id) {
	let { msg } = await sendRequest(`/api/v1/tasks/${id}`, {
		method: "DELETE",
	});
	if (!msg) {
		deleteAll();
		getAllTasks();
	} else {
		console.log(msg);
	}
}

function editTask(id) {
	window.location.replace("/");
}
