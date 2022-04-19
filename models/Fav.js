const mongoose = require('mongoose')

const schema = {
    'name': {
        type: String, 
        required: true
    },
    'favs': [{
        "name": String,
        "description": String,
        "link": String
    }]
}

const favSchema = mongoose.Schema(schema)

const Fav = mongoose.model('Fav',favSchema)

module.exports = Fav

/*
{
    "name": "ropa",
    "favs": [
        {
            "name": "polo",
            "description": "roto",
            "link": "https://www.google.com"
        },
        {
            "name": "casaca",
            "description": "nueva",
            "link": "https://www.youtube.com"
        }
    ]
}
*/