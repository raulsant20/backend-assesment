const mongoose = require('mongoose')

const schema = {
    'email': {
        type: String, 
        required: true
    },
    'password':{
        type: String, 
        required: true
    },
    'favsId': [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fav"
    }]
}

const userSchema = mongoose.Schema(schema)

const User = mongoose.model('User',userSchema)

module.exports = User