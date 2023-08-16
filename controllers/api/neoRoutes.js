const router = require('express').Router();
const { NEOs, Users, Favorites } = require('../../models/index.js');
require("dotenv").config();
const sequelize = require('../../config/connection')
const session = require("express-session")
const SequelizeStore = require('connect-session-sequelize')(session.Store)

// @/api/neo
router.get('/', async(req,res)=> {
    try{
        const neoData = await NEOs.findAll()
        res.status(200).json(neoData);
    }catch(err){
        res.status(400).json(err)
    }
});

// @/api/neo/
router.post('/', async(req, res)=> {
    try {
        const userId = req.session.user_id
        console.log(userId)

        const { data }  = req.body
        // console.log(data)

        const newNEO = await NEOs.create({
            data: data
        })

        const newFavorite = await Favorites.create({
            user_id: userId,
            neo_id: newNEO.id
        })

        res.status(200).json({ message: "NEO Saved"})
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router;