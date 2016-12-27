'use strict';

var basePath = require('path').resolve();
var User = require(basePath + '/models/User');

module.exports = {

    // function to fetch all users from db
    fetchAllUsers: function(req, res, next){
        var options = {
            where: {
                isDeleted: 0
            }
        };

        var success = function(result){
            if(result == ''){
                req.cdata = {
                    success: 1,
                    message: 'No users'
                };
                next();
            } else {
                req.cdata = {
                    success: 1,
                    message: 'Users retrieved successfully',
                    data: result
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        User.read(options, success, error);
    },

    // function to add a user to db
    addUser: function(req, res, next){
        var fields = ['fname', 'lname', 'username', 'password', 'email', 'address', 'phoneno', 'usertype'];
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
                return next("New user not added");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'New user successfully added',
                    data: result
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        User.create(options, success, error);

    },

    // function to add a user to db
    updateUser: function(req, res, next){
        if(!req.params || !req.params.id){
            return next("ID not provided");
        }

        var fields = ['fname', 'lname', 'username', 'password', 'email', 'address', 'phoneno', 'usertype'];
        req.collected_data = {};
        fields.forEach(function(entry){
            if(typeof(req.body[entry]) != 'undefined'){
                req.collected_data[entry] = req.body[entry];
            }
        });
        console.log(req.collected_data)
        var options = {
            data: req.collected_data,
            where: {
                isDeleted: 0,
                user_id: req.params.id
            }
        };

        var success = function(result){
            if(result[0] == ''){
                return next("User not updated");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'User successfully updated'
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        User.update(options, success, error);

    },

    // function to delete a user from db
    deleteUser: function(req, res, next){
        if(!req.params || !req.params.id){
            return next("ID not provided");
        }

        var options = {
            data: {
                isDeleted: 1
            },
            where: {
                user_id: req.params.id,
                isDeleted: 0
            }
        };

        var success = function(result){
            if(result[0] == ''){
                return next("No such user");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'User successfully deleted'
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        User.update(options, success, error);
    },

    // function to restore a user from db
    restoreUser: function(req, res, next){
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
                return next("No such deleted user");
            } else {
                req.cdata = {
                    success: 1,
                    message: 'User successfully restored'
                };
                next();
            }
        };

        var error = function(err){
            next(err);
        };

        User.update(options, success, error);
    }

};