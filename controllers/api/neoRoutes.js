const router = require('express').Router();
const { NEOs, Users, Favorites } = require('../../models/index.js');
require("dotenv").config();
const sequelize = require('../../config/connection')
const session = require("express-session")
const SequelizeStore = require('connect-session-sequelize')(session.Store)

// @/api/neo
router.get('/', async(req,res)=> {
    try{
        const userId = req.session.user_id
        const favorites = await Favorites.findAll({
            where: { user_id: userId},
            attributes: ['neo_id']
        })
        // console.log(favorites)
        const neoData = []
        for(const favorite of favorites){
            const { neo_id } = favorite.dataValues
            const neo = await NEOs.findByPk(neo_id)
            const { data } = neo.dataValues
            data.close_approach_data = data.close_approach_data[0]
            neoData.push(data)
        }
        res.render("neoDisplay", { 
            neoData,
            loggedIn: req.session.loggedIn,
            userId: req.session.user_id });
    }catch(err){
        res.status(400).json(err)
    }
});

// @/api/neo/
router.post('/', async(req, res)=> {
    try {
        const userId = req.session.user_id
        console.log(userId)

        const { records }  = req.body
        console.log(records)

        for(const record of records){
        const newNEO = await NEOs.create({
            data: record
        })
        const newFavorite = await Favorites.create({
            user_id: userId,
            neo_id: newNEO.id
        })
    }
        res.status(200).json({ message: "NEO Saved"})
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router;