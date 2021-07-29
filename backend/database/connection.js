const { Sequelize } = require('sequelize')

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_HOST, process.env.DB_PASS, {

    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00" 
})

module.exports = connection