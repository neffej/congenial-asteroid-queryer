const router = require('express').Router();
const path = require('path');

const apiRoutes = require('./api');

router.get('/', async(req, res) => {
    console.log("Hello!")
    res.render("homepage", {
        loggedin: true,
    })
});

router.use('/api', apiRoutes);


module.exports = router;