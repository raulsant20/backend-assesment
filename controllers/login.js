const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const verifiedPass = async (passwordSent, passwordStored) => {
    const isValid = await bcrypt.compare(passwordSent, passwordStored)
    return isValid
}

const login = async (req, res) => {
    const { email, password } = req.body
    //funcion para buscar email & pass
    try{
        const user = await User.findOne({email})
        const isVerified = verifiedPass(password, user.password)

        if(isVerified){
            const token = jwt.sign({ email }, "apple")
            console.log('User validated')
            res.status(200).json({token})
        } else{
            res.status(403).json({"message": "Correo o contraseña incorrecta"})
        }
    } catch(e){
        res.status(403).json({"message": "Correo o contraseña incorrecta"})
    }
    //funcion que crea token
    // const token = 'asd'
}

module.exports = login