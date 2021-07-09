const {Sequelize} = require("sequelize")
const connection = require("../database/connection")


const UserModel = connection.define('users', {

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    tel: {
        type: Sequelize.STRING,
        allowNull: false
    },

    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    role: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

UserModel.sync({force: false}).then(() => console.log("Table users created")).catch(err => console.log(err))

module.exports = UserModel