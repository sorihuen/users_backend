const mongoose = require('mongoose');

// confirmar que sea email 
const isEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// confirmar que sea password
const isPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
}

const getMongoId = (id) => {
	return mongoose.Types.ObjectId.createFromHexString(id);
}

// generar Id unico
const generateUniqueId = () => {
	const timestamp = new Date().getTime().toString(16);
	const randomValue = Math.random().toString(16).substring(2);
	return `${timestamp}-${randomValue}`;
}

// respuesta de error
const resError = (res, error, code, msg, details) => {
	res.status(code).send({
		error: {
			code: code,
			message: msg || 'Internal server error',
			details: details,
			error: error.message
		}
	});
};

const renameWithUser = (data) => {
	return `${data.name.split(' ')[0]}_${data.paternal_surname.split(' ')[0]}_${data.maternal_surname.split(' ')[0]}_${data._id}_${generateUniqueId()}`
};

module.exports = {isEmail, isPassword, getMongoId, generateUniqueId, resError, renameWithUser};