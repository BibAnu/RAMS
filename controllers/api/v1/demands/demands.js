'use strict';

var basePath = require('path').resolve();
var Demand = require(basePath + '/models/Demands');

module.exports = {

    // function to fetch all demands from db
    fetchAllDemands: function(req, res, next){
        var options = {
            where: {
                isDeleted: 0
            }
        };

        var success = function(result){
            if(result == ''){
                req.cdata = {
                    success: 1,
                    message: 'No demands'
                };
                next();
            } else {
                req.cdata = {
                    success: 1,
                    message: 'demands retrieved successfully',
                    data: result
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Demand.read(options, success, error);
    },

    // function to add a demand to db
    addDemand: function(req, res, next){
        var fields = ['visano','name'];
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
                return next("New demand not added");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'New demand successfully added',
                    data: result
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Demand.create(options, success, error);

    },

    // function to add a demand to db
    updateDemand: function(req, res, next){
        if(!req.params || !req.params.id){
            return next("ID not provided");
        }

        var fields = ['visano','name'];
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
                return next("Demand not updated");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'Demand successfully updated'
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Demand.update(options, success, error);

    },

    // function to delete a demand from db
    deleteDemand: function(req, res, next){
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
                return next("No such demand");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'Demand successfully deleted'
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Demand.update(options, success, error);
    },

    // function to restore a demand from db
    restoreDemand: function(req, res, next){
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
                return next("No such deleted demand");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'Demand successfully restored'
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Demand.update(options, success, error);
    }

};