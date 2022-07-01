const { CustomAPIError } = require("../errors/custom-api-error");
const mongooseError = require("mongoose").Error;
const errorHandlerMiddleware = (err, req, res, next) => {
	if (err instanceof mongooseError.ValidationError) {
		return res.status(400).json({ msg: "Khong duoc de trong title" });
	}
	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message });
	}
	return res.status(500).json({ msg: "Something has broken" });
};

module.exports = errorHandlerMiddleware;
