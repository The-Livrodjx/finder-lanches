const PaymentModel = require('../models/Payment')
const {Op} = require("sequelize")

class PaymentController {

    async getAllRequests(req, res) {

        PaymentModel.findAll({where: {status: {[Op.ne]: 1}}}).then(response => {

            res.json(response)
        })
    }
    async deleteRequest(req, res) {

        const {id} = req.params

        if(id !== undefined) {
            PaymentModel.destroy({where: {id: id}}).then(() => {

                res.status(200)
                res.send("Ok")
            })
            .catch(err => {

                res.json({err: err.message})
            })
        }
    }
}

module.exports = new PaymentController()