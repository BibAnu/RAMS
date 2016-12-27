'use strict';

var path = require('path');
var basePath = path.resolve();
var config = require(basePath + '/config/config');
var v1 = config.versions.v1.prefix;
var demands = require('./demands');
var mw = require(basePath + '/middlewares/response');

module.exports = function(app){

    // API to fetch all active demands from demands table
    app.get(v1 + '/demand/all', demands.fetchAllDemands, mw.respond, mw.error);

    // API to add a demand to the demands table
    app.post(v1 + '/demand/add', demands.addDemand, mw.respond, mw.error);

    // API to update a demand to the demands table
    app.put(v1 + '/demand/update/:id', demands.updateDemand, mw.respond, mw.error);

    // API to delete a demand to the demands table
    app.post(v1 + '/demand/delete/:id', demands.deleteDemand, mw.respond, mw.error);

    // API to restore a demand to the demands table
    app.get(v1 + '/demand/restore/:id', demands.restoreDemand, mw.respond, mw.error);
};