const { Model, DataTypes } = require('sequelize');
const Sequelize = require("../config/connection");

class Goals extends Model {}

Goals.init(
    {
        goal_id {
            type: DataTypes.String,
            allownull: false,
            foriegnKey: user_id 
        },
        category_id {
            type: DataTypes.String
            allownull: false,
        },
        goal_description{
            type: DataTypes.String
            allownull: true,
        },
        deadline_date{
            timestamp: new Date
            allownull: true,
        },
        
    },
    {
        sequelize,
        timestamp: false,
        freezeTable: true
        modelName: 'Goals'
    },
);

module.exports = Goals;