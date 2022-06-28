const express = require("express");
const app = express();
const router = require("./routes/router");
const connectDB = require("./db/connect");
require("dotenv").config();
//static file
app.use(express.static("./public"));
// tra ve middleware phan tich json, va chi phan tich khi content-type trung voi type option
app.use(express.json());
// dinh dang urlEncoded
app.use(express.urlencoded({ extended: false }));
// use router middleware
app.use("/api/v1/tasks", router);

const port = 3000;

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html", (err) => {
		console.log(err);
	});
});
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI).then(() =>
			console.log("Connected...")
		);
		app.listen(port, () => {
			console.log("Server is running on port:", port);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
