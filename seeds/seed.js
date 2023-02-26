const sequelize = require('../config/connection');
const { Users, NEOs, Favorites } = require('../models/index');

const neoData = require('./neoData.json');
const userData = require('./userData.json');
const favoriteData = require('./favoriteData.json');

const seedAll = async() => {
    await sequelize.sync({ force: true });

    await NEOs.bulkCreate(neoData);

    await Users.bulkCreate(userData);

    await Favorites.bulkCreate(favoriteData);

    process.exit(0);
};

seedAll();