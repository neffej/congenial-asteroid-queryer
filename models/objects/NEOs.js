const { Model, DataTypes, INTEGER }  = require('sequelize');
const sequelize = require ('../../config/connection');

class NEOs extends Model {}

NEOs.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        data:{
            type: DataTypes.JSON,
            allowNull: false,
        }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'neos',
}
);

module.exports = NEOs;
