'use strict';

var basePath = require('path').resolve();

var db = require(basePath + '/util/db');
var Sequelize = require('sequelize');

var users = db.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fname: {
        type: Sequelize.STRING(50),
        field: 'fname',
        allowNull: false
    },
    lname: {
        type: Sequelize.STRING(50),
        field: 'lname',
        allowNull: false
    },
    username: {
        type: Sequelize.STRING(25),
        field: 'username',
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(25),
        field: 'password',
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        field: 'email',
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    address: {
        type: Sequelize.TEXT,
        field: 'address',
        allowNull: false
    },
    phoneno: {
        type: Sequelize.BIGINT(10),
        field: 'phoneno',
        allowNull: false,
    },
    usertype: {
        type: Sequelize.STRING(6),
        field: 'usertype',
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

users.sync();

module.exports = users;