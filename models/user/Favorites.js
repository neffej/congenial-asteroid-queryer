const { Model, DataTypes } = require('sequelize');
const sequelize = require ('../../config/connection');

class Favorites extends Model {}

Favorites.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        neo_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "neos",
                key: "id",
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            }
        }
},{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Favorites",
});

module.exports = Favorites;