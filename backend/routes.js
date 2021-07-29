const express = require("express")

const routes = express.Router()

const userController = require("./controllers/UserController")
const productController = require("./controllers/ProductController")
const paymentController = require("./controllers/PaymentController")
const userAuth = require("./middlewares/userAuth")

routes.post("/", userAuth , userController.index)
routes.post("/getRequests", userController.getRequests)
routes.get("/newRoute", userController.index)
routes.get("/getUsers", userController.getAllUsers)
routes.get("/genToken", userController.genToken)
routes.post("/createUser", userController.createUser)
routes.get("/getProducts", productController.index)
routes.post("/createProducts", productController.createProduct)
routes.post("/authenticate", userController.authenticate)
routes.get("/getAllRequests", paymentController.getAllRequests)
routes.delete("/deleteRequest/:id", paymentController.deleteRequest)

module.exports = routes