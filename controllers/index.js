const router = require('express').Router();
const path = require('path');

const neoRoutes = require('./NEO-routes/neoRoutes');
const userRoutes = require('./User-routes/userRoutes');

router.get('/', async(req, res) => {
    console.log("Hello!")
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.use('/user', userRoutes);
router.use('/neo', neoRoutes);


module.exports = router;