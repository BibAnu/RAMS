'use strict';

var candidate = require('./tbl_candidates');

module.exports = {

    read: function(options, success, error){
        candidate.findAll({where: options.where}).then(success, error);
    },

    create: function(options, success, error){
        candidate.create(options.data).then(success, error);
    },

    update: function(options, success, error){
        candidate.update(options.data, {where: options.where}).then(success, error);
    }

};