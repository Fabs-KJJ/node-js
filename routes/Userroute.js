const express = require("express");
const route = express.Router();
const UserController = require("../controller/UserController");


// Get a list of registered users from the database
route.get('/register', UserController.getUser);

route.patch('/register/:id', UserController.updateUser);

const authSchema = require("../auth/auth_schema").authSchema;
//POST
route.post('/register', UserController.Adduser);
route.delete('/register/:id', UserController.deleteUser);
route.post('/register/login', UserController.login);
route.post('/register/refresh', UserController.refreshToken);




module.exports = route;
