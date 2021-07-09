const jwt = require("jsonwebtoken")
const secret = "KLSFAFKLAFNMJFSNFASNMJAFSNMJ"

module.exports = (req, res, next) => {

    const authToken = req.headers['authorization']

    if(authToken) {
        const bearer = authToken.split(" ")
    
        var token = bearer[1]
        
        if(token) {

            var decoded = jwt.verify(token, secret)

            if(decoded) {
                req.userInformation = { nome: decoded.nome}

                next()
            }
            else {
                
            }
        }
    }
}