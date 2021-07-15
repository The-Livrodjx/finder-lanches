const express = require("express")

const routes = express.Router()

const userController = require("./controllers/UserController")
const productController = require("./controllers/ProductController")
const userAuth = require("./middlewares/userAuth")

routes.get("/", userAuth , userController.index)
routes.get("/newRoute", userController.index)
routes.get("/getUsers", userController.getAllUsers)
routes.get("/genToken", userController.genToken)
routes.post("/createUser", userController.createUser)
routes.get("/getProducts", productController.index)
routes.post("/createProducts", productController.createProduct)
routes.post("/authenticate", userController.authenticate)

module.exports = routes