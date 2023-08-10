const router = require('express').Router();
const { NEOs } = require('../../models/objects/NEOs');
require("dotenv").config();

router.get('/', async(req,res)=> {
    try{
        const neoData = await NEOs.findAll()
        res.status(200).json(neoData);
    }catch(err){
        res.status(400).json(err)
    }
});

// @/api/neo/search
router.get('/search', async(req, res)=>{
    try {
        const key = process.env.API_KEY
        const { start_date, end_date } = req.body

        var baseURL = 'https://api.nasa.gov/neo/rest/v1/'
        var dateQueryURL = `feed?start_date=${start_date}&end_date=${end_date}&api_key=${key}`
        fetch(baseURL + dateQueryURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            res.json(data)
        })
    } catch (error) {
        res.status(400).json({ Message: "something went wrong" })
    }
})

module.exports = router;