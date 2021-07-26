const {Sequelize} = require("sequelize")


const connection = require("../database/connection")
const UserModel = require("./Usuario")


const PaymentModel = connection.define("payments", {

    cod_pag: {
        type: Sequelize.STRING,
        allowNull: false
    },
    payer: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

PaymentModel.belongsTo(UserModel)


PaymentModel.sync({force: false}).then(() => console.log("Table payments successfully created"))

module.exports = PaymentModel