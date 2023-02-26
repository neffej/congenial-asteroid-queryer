const router = require('express').Router();

const neoRoutes = require('./neoRoutes');
const userRoutes = require('./userRoutes')

router.use('/neo', neoRoutes);
router.use('/user', userRoutes);

module.exports = router;