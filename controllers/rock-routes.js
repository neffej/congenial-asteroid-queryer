const router = require('express').Router();
const path = require('path');

router.get('/', async(req, res) => {
    console.log("Hello!")
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;