require('dotenv').config()

const express = require("express")
const MercadoPago = require("mercadopago")
const app = express()
const uuid = require("uuid")
const cors = require("cors")
const PORT = process.env.PORT || 3333

const connection = require("./database/connection")


const routes = require("./routes")

const UserModel = require("./models/Usuario")
const PaymentModel = require("./models/Payment")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

MercadoPago.configure({

    sandbox: true,
    access_token: process.env.ACCESS_TOKEN
})

connection.authenticate().then(() => {
    console.log("Successfully connected to database")
}).catch(err => {

    console.log(err)
})

app.post("/checkout", async (req, res) => {
    var random_id = uuid.v4()
    const {email, price, description} = req.body

    UserModel.findOne({ where: { email: email } }).then(user => {


        if (user !== undefined) {

            var dados = {
                items: [
                    item = {

                        id: random_id,
                        title: `${description}`,
                        quantity: 1,
                        currency_id: "BRL",
                        unit_price: parseFloat(price)
                    }
                ],
                payer: {
                    email: user.email,
                },
                external_reference: random_id
            }

            PaymentModel.create({

                cod_pag: random_id,
                payer: user.email,
                status: 0,
                userId: user.id
            }).then(async () => {
                var pagamento = await MercadoPago.preferences.create(dados)

                console.log(pagamento)

                return res.send({url: pagamento.body.init_point})
                
            })
            
        }
    })

})
app.listen(PORT, () => console.log("Server running at port: " + PORT))