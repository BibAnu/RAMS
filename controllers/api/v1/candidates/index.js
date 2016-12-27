'use strict';

var path = require('path');
var basePath = path.resolve();
var config = require(basePath + '/config/config');
var v1 = config.versions.v1.prefix;
var candidates = require('./candidates');
var mw = require(basePath + '/middlewares/response');

module.exports = function(app){

    // API to fetch all active candidates from candidates table
    app.get(v1 + '/candidate/all', candidates.fetchAllCandidates, mw.respond, mw.error);

    // API to add a candidate to the candidates table
    app.post(v1 + '/candidate/add', candidates.addCandidate, mw.respond, mw.error);

    // API to update a candidate to the candidates table
    app.put(v1 + '/candidate/update/:id', candidates.updateCandidate, mw.respond, mw.error);

    // API to delete a candidate to the candidates table
    app.post(v1 + '/candidate/delete/:id', candidates.deleteCandidate, mw.respond, mw.error);

    // API to restore a candidate to the candidates table
    app.get(v1 + '/candidate/restore/:id', candidates.restoreCandidate, mw.respond, mw.error);

    // API to fetch a single candidate according to provided visano from the candidates table
    app.post(v1 + '/candidate/fetch/:id', candidates.fetchCandidates, mw.respond, mw.error);
};