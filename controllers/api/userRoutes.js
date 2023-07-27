const router = require('express').Router();
const { Users } = require('../../models/user/Users');

router.get('/', async(req,res)=> {
    try{
        const neoData = await NEOs.findAll()
        res.status(200).json(neoData);
    }catch(err){
        res.status(400).json(err)
    }
});

router.get('/login', async(req, res) =>{
    try {
        res.render("login")
    } catch (error) {
        res.status(400).json(err)
    }
})

router.get('/register', async(req, res)=>{
    try {
        res.render('register')
    } catch (error) {
        res.status(400).json(err)
    }
})

module.exports = router;