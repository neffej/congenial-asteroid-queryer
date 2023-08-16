const Users = require('./user/Users');
const NEOs = require('./objects/NEOs')
const Favorites = require('./user/Favorites')

// Favorites.belongsToMany(NEOs, { foreignKey: 'neo_id', allowNull: false });
// Favorites.belongsToMany(Users, { foreignKey: 'user_id', allowNull: false });

module.exports = {
    Users,
    NEOs,
    Favorites
};