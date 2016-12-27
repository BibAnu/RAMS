'use strict';

var basePath = require('path').resolve();

var db = require(basePath + '/util/db');
var Sequelize = require('sequelize');

var company = db.define('company', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(255),
        field: 'name',
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        field: 'email',
        allowNull: false
    },
    city: {
        type: Sequelize.STRING(75),
        field: 'city',
        allowNull: true
    },
    country: {
        type: Sequelize.STRING(50),
        field: 'country',
        allowNull: false
    },
    username: {
        type: Sequelize.STRING(25),
        field: 'username',
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

company.sync();

module.exports = company;