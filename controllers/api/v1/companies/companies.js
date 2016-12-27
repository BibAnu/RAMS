'use strict';

var basePath = require('path').resolve();
var Company = require(basePath + '/models/Companies');

module.exports = {

    // function to fetch all companies from db
    fetchAllCompanies: function(req, res, next){
        var options = {
            where: {
                isDeleted: 0
            }
        };

        var success = function(result){
            if(result == ''){
                req.cdata = {
                    success: 1,
                    message: 'No companies'
                };
                next();
            } else {
                req.cdata = {
                    success: 1,
                    message: 'companies retrieved successfully',
                    data: result
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Company.read(options, success, error);
    },
    
    // function to add a company to db
    addCompany: function(req, res, next){
        var fields = ['name','email','city','country','username'];
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
                return next("New company not added");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'New company successfully added',
                    data: result
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Company.create(options, success, error);

    },

    // function to add a company to db
    updateCompany: function(req, res, next){
        if(!req.params || !req.params.id){
            return next("ID not provided");
        }

        var fields = ['name','email','city','country','username'];
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
                return next("Company not updated");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'Company successfully updated'
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Company.update(options, success, error);

    },

    // function to delete a company from db
    deleteCompany: function(req, res, next){
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
                return next("No such company");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'Company successfully deleted'
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Company.update(options, success, error);
    },

    // function to restore a company from db
    restoreCompany: function(req, res, next){
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
                return next("No such deleted company");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'Company successfully restored'
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        Company.update(options, success, error);
    }

};