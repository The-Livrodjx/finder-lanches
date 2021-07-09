const UserModel = require("../models/Usuario")
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const secret = "KLSFAFKLAFNMJFSNFASNMJAFSNMJ"

class UserController {
   
    async index(req, res) {

        res.json({msg: "UserController"})
    }
    
    async genToken(req, res ) {

        var token = jwt.sign({nome: "Livrodjx"}, secret)

        res.json(token)
    }
    async getAllUsers(req, res) {

        UserModel.findAll().then(users => {

            if(users) {
                res.json(users)
            }

            else {
                res.json({msg: "Lista de usuários vazia..."})
            }
        }).catch(err => {
            
            res.status(406)
            res.json({err: err.message})
        })
    }

    async createUser(req, res) {

        const {name, email, password, role} = req.body 

        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)

        UserModel.findOne({where: {email: email}}).then(user => {

            if(!user) {
                UserModel.create({name, email, password: hash, role}).then(() => {

                    res.json({msg: "Usuário criado com sucesso"})
                })
                .catch(err => {
                    res.json({err: err.message})
                })
            }
            else {

                res.status(406)
                res.json({err: "Email já cadastrado"})
            }
        }).catch(err => {
            
            res.status(406)
            res.json({err: err.message})
        })
        

        
    }

}

module.exports = new UserController()