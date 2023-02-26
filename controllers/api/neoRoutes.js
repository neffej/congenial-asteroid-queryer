const router = require('express').Router();
const { NEOs } = require('../../models/objects/NEOs');

router.get('/', async(req,res)=> {
    try{
        const neoData = await NEOs.findAll()
        res.status(200).json(neoData);
    }catch(err){
        res.status(400).json(err)
    }
});

module.exports = router;