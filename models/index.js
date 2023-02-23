const Users = require('./user/Users');
const NEOs = require('./objects/NEOs')
const Favorites = require('./user/Favorites')

Users.belongsToMany(NEOs, { through: Favorites });
NEOs.belongsToMany(Users, { through: Favorites });

module.exports = {
    Users,
    NEOs,
    Favorites,
};