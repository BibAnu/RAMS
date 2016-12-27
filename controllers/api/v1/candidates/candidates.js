'use strict';

var basePath = require('path').resolve();
var Candidate = require(basePath + '/models/Candidates');

module.exports = {

    // function to fetch all candidates from db
    fetchAllCandidates: function(req, res, next){
        var options = {
            where: {
                isDeleted: 0
            }
        };

        var success = function(result){
            if(result == ''){
                req.cdata = {
                    success: 1,
                    message: 'No candidates'
                };
                next();
            } else {
                req.cdata = {
                    success: 1,
                    message: 'candidates retrieved successfully',
                    data: result
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Candidate.read(options, success, error);
    },
    // function to fetch candidates using visano from db
    fetchCandidates: function(req, res, next){
        if(!req.params || !req.params.id){
            return next("Visano not provided");
        }

        var options = {
            where: {
                visano: req.params.id,
                isDeleted: 0
            }
        };

        var success = function(result){
            if(result == null){
                req.cdata = {
                    success: 0,
                    message: 'No such visano'
                };
                next();
            } else {
                req.cdata = {
                    success: 1,
                    message: 'Candidates retrieved successfully',
                    data: result
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Candidate.read(options, success, error);
    },
    
    // function to add a candidate to db
    addCandidate: function(req, res, next){
        var fields = ['fname','mname','lname','passportno','city','district','contact','post','visano','status'];
        req.collected_data = {};
        fields.forEach(function(entry){
            if(typeof(req.body[entry]) != 'undefined'){
                req.collected_data[entry] = req.body[entry];
            }
        });

        var options = {
            data: req.collected_data
        };
        var success = function(result){
            if(!result.$options.isNewRecord){
                return next("New candidate not added");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'New candidate successfully added',
                    data: result
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Candidate.create(options, success, error);

    },

    // function to add a candidate to db
    updateCandidate: function(req, res, next){
        if(!req.params || !req.params.id){
            return next("ID not provided");
        }

        var fields = ['fname','mname','lname','passportno','city','district','contact','post','visano','status'];
        req.collected_data = {};
        fields.forEach(function(entry){
            if(typeof(req.body[entry]) != 'undefined'){
                req.collected_data[entry] = req.body[entry];
            } 
        });

        var options = {
            data: req.collected_data,
            where: {
                isDeleted: 0,
                id: req.params.id
            }
        };

        var success = function(result){
            if(result[0] == ''){
                return next("Candidate not updated");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'Candidate successfully updated'
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Candidate.update(options, success, error);

    },

    // function to delete a candidate from db
    deleteCandidate: function(req, res, next){
        if(!req.params || !req.params.id){
            return next("ID not provided");
        }

        var options = {
            data: {
                isDeleted: 1
            },
            where: {
                id: req.params.id,
                isDeleted: 0
            }
        };

        var success = function(result){
            if(result[0] == ''){
                return next("No such candidate");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'Candidate successfully deleted'
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Candidate.update(options, success, error);
    },

    // function to restore a candidate from db
    restoreCandidate: function(req, res, next){
        if(!req.params || !req.params.id){
            return next("ID not provided");
        }

        var options = {
            data: {
                isDeleted: 0
            },
            where: {
                id: req.params.id,
                isDeleted: 1
            }
        };

        var success = function(result){
            if(result[0] == ''){
                return next("No such deleted candidate");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'Candidate successfully restored'
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Candidate.update(options, success, error);
    }

};