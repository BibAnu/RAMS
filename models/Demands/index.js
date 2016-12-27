'use strict';

var demand = require('./tbl_demands');

module.exports = {

    read: function(options, success, error){
        demand.findAll({where: options.where}).then(success, error);
    },

    create: function(options, success, error){
        demand.create(options.data).then(success, error);
    },

    update: function(options, success, error){
        demand.update(options.data, {where: options.where}).then(success, error);
    }

};