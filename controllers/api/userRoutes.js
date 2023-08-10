const router = require('express').Router();
const Users  = require('../../models/user/Users');
const sequelize = require('../../config/connection')
const session = require("express-session")
const SequelizeStore = require('connect-session-sequelize')(session.Store)


// @/api/user/
router.get('/', async(req,res)=> {
    try{
        const neoData = await NEOs.findAll()
        res.status(200).json(neoData);
    }catch(err){
        res.status(400).json(err)
    }
});

// @/api/user/login
router.get('/login', async(req, res) =>{
    try {
        console.log(req.session)
        res.render("login")
    } catch (error) {
        res.status(400).json(error)
    }
})


// @/api/user/register
router.get('/register', async(req, res)=>{
    try {
        res.render('register')
    } catch (error) {
        res.status(400).json(err)
    }
})

// @/api/user/register
router.post('/register', async(req,res)=>{
    try {
        let { first_name, last_name, username, email, password } = req.body
        const userExists = await Users.findOne({ where: { email: email } })

        if(userExists){
            console.log(userExists instanceof Users)
            console.log(userExists.email)
            res.status(400)
            throw new Error("User already exists")
        }else{
            console.log("Unique email!")
    }

    let user = Users.create({
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: password
    })
        if(user){
            req.session.loggedIn = true
            res.status(201).json({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                password: user.password
            })
        }else{
            res.status(400)
            throw new Error ("Invalid user data")
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/login', async(req,res)=>{
    console.log("message received")
    console.log(req.body)
    try {
        let { username, password } = req.body
        const userExists = await Users.findOne({ where: { username: username } })

        if(userExists){
            console.log("user exists")
            const validatePw = userExists.checkPassword(password)
            if(validatePw == false){
                res.status(400).json({ message: "Invalid Password"});
                return;
            }else{
                console.log("correct pw")
            req.session.loggedIn = true
            req.session.user_id = userExists.id
            console.log(req.session)
            res.status(200).json({ message: "Valid Login" })
        }
        }else{
            res.status(400).json({ message: "Username not found"})
            return;
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

router.get("/logout", async (req, res) => {
	try {
		req.session.destroy(() => {
            res.render("homepage")
		});
	} catch (err) {
		res.status(404).end();
	}
});


module.exports = router;