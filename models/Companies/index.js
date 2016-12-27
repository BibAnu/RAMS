'use strict';

var company = require('./tbl_company');

module.exports = {

    read: function(options, success, error){
        company.findAll({where: options.where}).then(success, error);
    },

    create: function(options, success, error){
        company.create(options.data).then(success, error);
    },

    update: function(options, success, error){
        company.update(options.data, {where: options.where}).then(success, error);
    }

};