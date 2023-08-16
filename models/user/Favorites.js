const { Model, DataTypes } = require('sequelize');
const sequelize = require ('../../config/connection');
const Users = require('./Users.js')
const NEOs = require('../objects/NEOs.js')
class Favorites extends Model {}

Favorites.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    }, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "favorites",
});

Favorites.belongsTo(Users, { foreignKey: 'user_id', allowNull: false });
Favorites.belongsTo(NEOs, { foreignKey: 'neo_id', allowNull: false });


module.exports = Favorites;

//        // neo_id:{
        //     type:DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: "neos",
        //         key: "id"
        //     }
        // },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: "users",
        //         key: "id",
        //     }