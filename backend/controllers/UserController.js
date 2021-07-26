const UserModel = require("../models/Usuario")
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const secret = "KLSFAFKLAFNMJFSNFASNMJAFSNMJ"

class UserController {
   
    async index(req, res) {

        res.json({msg: "Tudo ok"})
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

        const {name, email, password, tel,endereco, role} = req.body 

        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)

        UserModel.findOne({where: {email: email}}).then(user => {

            if(!user) {
                UserModel.create({name, email, password: hash, tel, endereco, role}).then(() => {

                    var token = jwt.sign({nome: "Livrodjx"}, secret)

                    res.json({msg: "Usuário criado com sucesso", token, userName: name})
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

    async authenticate(req, res) {

        const {email, password} = req.body

        if(email !== '' && email !== " " && email !== undefined) {

            if(password !== '' && password !== " " && password !== undefined){

                UserModel.findOne({
                    where: {email: email}
                }).then(user => {

                    if(user !== undefined) {
                        let correct = bcrypt.compareSync(password, user.password)
                        if(correct) {

                            var token = jwt.sign({name: user.name}, secret, {expiresIn: Date.now() * 60 * 60})

                            return res.json({token, userName: user.name, email: user.email})
                        }
                        else {
                            res.status(406)
                            return res.json({errMsg: "Email ou senha inválidos", err})
                        }
                    }
                    else {
                        res.status(406)
                        return res.json({errMsg: "Email ou senha inválidos", err})
                    }
                }).catch(err => {
                    res.status(406)
                    return res.json({errMsg: "Email ou senha inválidos", err})
                })
            }
            else {
                res.status(406)
                return res.json({errMsg: "Por favor digite os dados corretamente"})
            }
        }
        else {
            res.status(406)
            return res.json({errMsg: "Por favor digite os dados corretamente"})
        }
    }

}

module.exports = new UserController()