require('dotenv').config()

const express = require("express")
const app = express()

const PORT = process.env.PORT || 3333

const connection = require("./database/connection")

const routes = require("./routes")

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(routes)

connection.authenticate().then(() => {
    console.log("Successfully connected to database")
}).catch(err => {

    console.log(err)
})


app.listen(PORT, () => console.log("Server running at port: " + PORT))