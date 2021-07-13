const ProductModel = require("../models/Product")

class ProductController {

    async index(req, res) {

        ProductModel.findAll().then(products => {

            if(products !== undefined) {

                res.json(products)
            }
        })
    }

    async createProduct(req, res) {

        const {
            name,
            price,
            url,
            amount 
        } = req.body


        if(name !== undefined && price !== undefined && amount !== undefined) {

            ProductModel.create({name, price, url, amount}).then(() => {

                res.json({msg: "Produto cadastrado com sucesso"})
            }).catch(err => {

                res.json({msg: err.message})
            })
        }
    }
}

module.exports = new ProductController()