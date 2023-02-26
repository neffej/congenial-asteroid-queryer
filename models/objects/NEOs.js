const { Model, DataTypes, INTEGER }  = require('sequelize');
const sequelize = require ('../../config/connection');

class NEOs extends Model {}

NEOs.init(
    {
        absolute_magnitude_h: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        close_approach_data: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        estimated_diameter: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        is_potentially_hazardous_asteroid: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        is_sentry_object: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        links: {
            type: DataTypes.JSON
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nasa_jpl_url: {
            type: DataTypes.STRING,
        },
        neo_reference_id: {
            type: DataTypes.STRING
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