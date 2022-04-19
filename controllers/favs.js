const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Fav = require('../models/Fav')
const mongoose = require('mongoose')

const create = async (req, res) => {
    const { name, favs } = req.body
    const email = req.email
    //funcion que busca el usuario
    try{
        const user = await User.findOne({email})
        //funcion que guarda los favoritos
        const fav = new Fav({
            name,
            favs
        })
        const favSaved = await fav.save()
        const favId = favSaved._id
        const favArray = [...user.favsId, favId]
        const userUpdated = await User.findOneAndUpdate(
            { email },
            {favsId: favArray},
            {new: true}
        )
        res.status(200).json({
            "message": "Fav created",
            userUpdated,
            favSaved
        })
    } catch(e){
        res.status(500).send({
            "message": "Something wrong"
        })
    }

}

const getFavs = async (req, res) => {
    const email = req.email
    //funcion que busca lista de favoritos del email
    try{
        const user  = await User.findOne({email}).populate("favsId")
        res.status(203).json({
            "message": "Favs found",
            "favs": user.favsId
        })
    } catch(e){
        res.status(400).json({
            "message": "Fav not found"
        })
    }
    // const favsId = user.favsId
    // const favsArray = []
    // const favsArray = favsId.map(async (id) => {
        
    //     const a = await Fav.findById(id)
    //     console.log(a)
    //     return a
    // })
    // res.status(203).json({
    //     favsArray
    // })

    // for(let i=0; i < favsId.length; i++){
    //     const a = await Fav.findById(favsId[i])
    //     favsArray.push(a)
    // }
    
}

const getFavId = async (req, res) => {
    const email = req.email
    const { id } = req.params
    //funcion que verifica si el id le pertenece al usuario
    const user  = await User.findOne({email})
    const idList = user.favsId

    if(!idList.includes(id)){
        res.status(400).json({
            "message": "id doesn't belong to user",
        })
    } else{
        //funcion que busca dentro del email la lista con el id
        const Favs = await Fav.findById(id)
        res.status(200).json({
            "message": "Favs found by id with a correct user",
            Favs
        })
    }
}

const deleteFavId = async (req, res) => {
    const email = req.email
    const { id } = req.params
    //funcion que busca dentro del email la lista con el id y la elimina
    const user  = await User.findOne({email})
    const idList = user.favsId

    if(!idList.includes(id)){
        res.status(400).json({
            "message": "id doesn't belong to user",
        })
    } else{
        //funcion que busca dentro del email la lista con el id
        const Favs = await Fav.findByIdAndDelete(id)
        const favArray = idList.filter(x => x.toString() !== id)
        console.log(favArray)
        const userUpdated = await User.findOneAndUpdate(
            { email },
            {favsId: favArray},
            {new: true}
        )
        res.status(200).json({
            "message": "Favs deleted by id with a correct user",
            "Favs deleted": Favs
        })
    }
}

module.exports = {create, getFavs, getFavId, deleteFavId}
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