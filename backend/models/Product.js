const {Sequelize} = require("sequelize")
const connection = require("../database/connection")

const ProductModel = connection.define("products", {

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    price: {
        type: Sequelize.STRING,
        allowNull: false
    },

    initialValue: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    
    value: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    amountToSell: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },

    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

ProductModel.sync({force: false}).then(() => console.log("Table products successfully created"))

module.exports = ProductModel