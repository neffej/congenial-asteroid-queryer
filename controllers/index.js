const router = require('express').Router();
const path = require('path');

const apiRoutes = require('./api');

router.get('/', async(req, res) => {
    console.log("Hello!")
    res.render("homepage", {
        loggedIn: req.session.loggedIn,
        userId: req.session.user_id
    })
});

router.use('/api', apiRoutes);


module.exports = router;