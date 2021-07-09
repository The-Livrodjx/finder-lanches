const express = require("express")

const routes = express.Router()

const userController = require("./controllers/UserController")
const userAuth = require("./middlewares/userAuth")

routes.get("/", userAuth, userController.index)
routes.get("/newRoute", userController.index)
routes.get("/getUsers", userController.getAllUsers)
routes.get("/genToken", userController.genToken)
routes.post("/createUser", userController.createUser)

module.exports = routes