'use strict';

var basePath = require('path').resolve();

var db = require(basePath + '/util/db');
var Sequelize = require('sequelize');

var candidates = db.define('candidate', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fname: {
        type: Sequelize.STRING(20),
        field: 'fname',
        allowNull: false
    },
    mname: {
        type: Sequelize.STRING(20),
        field: 'mname',
        allowNull: true
    },
    lname: {
        type: Sequelize.STRING(25),
        field: 'lname',
        allowNull: false
    },
    passportno: {
        type: Sequelize.BIGINT(8),
        field: 'passportno',
        allowNull: false
    },
    city: {
        type: Sequelize.STRING(50),
        field: 'city',
        allowNull: true
    },
    district: {
        type: Sequelize.STRING(15),
        field: 'district',
        allowNull: false
    },
    contact: {
        type: Sequelize.BIGINT(10),
        field: 'contact',
        allowNull: true,
    },
    post: {
        type: Sequelize.STRING(50),
        field: 'post',
        allowNull: false
    },
    status: {
        type: Sequelize.STRING(25),
        field: 'status',
        allowNull: false
    },
    visano: {
        type: Sequelize.BIGINT(10),
        field: 'visano',
        allowNull: false,
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

candidates.sync();

module.exports = candidates;