'use strict';

var basePath = require('path').resolve();

var db = require(basePath + '/util/db');
var Sequelize = require('sequelize');

var demands = db.define('demand', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    visano: {
        type: Sequelize.BIGINT(10),
        field: 'visano',
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING(255),
        field: 'name',
        allowNull: false
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'isDeleted',
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'createdAt',
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updatedAt',
        allowNull: false
    }

});

demands.sync();

module.exports = demands;