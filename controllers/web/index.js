'use strict';

module.exports = function(app){

    app.get('/', function(req, res, next){
        res.render('layout');
    });

    app.get('/view/login', function(req, res, next){
        res.render('login');
    });

    app.get('/view/dashboardClient', function(req, res, next){
        res.render('dashboardClient');
    });

    app.get('/view/dashboard', function(req, res, next){
        res.render('dashboard');
    });

    app.get('/dashboard/view/user', function(req, res, next){
        res.render('viewUser');
    });

    app.get('/dashboard/add/user', function(req, res, next){
        res.render('addUser');
    });

    app.get('/dashboard/update/user', function(req, res, next){
        res.render('updateUser');
    });

    app.get('/dashboard/view/candidate', function(req, res, next){
        res.render('viewCandidate');
    });

    app.get('/dashboard/add/candidate', function(req, res, next){
        res.render('addCandidate');
    });

    app.get('/dashboard/update/candidate', function(req, res, next){
        res.render('updateCandidate');
    });
    app.get('/dashboard/view/company', function(req, res, next){
        res.render('viewCompany');
    });

    app.get('/dashboard/add/company', function(req, res, next){
        res.render('addCompany');
    });

    app.get('/dashboard/update/company', function(req, res, next){
        res.render('updateCompany');
    });
    app.get('/dashboard/view/demand', function(req, res, next){
        res.render('viewDemand');
    });

    app.get('/dashboard/add/demand', function(req, res, next){
        res.render('addDemand');
    });

    app.get('/dashboard/update/demand', function(req, res, next){
        res.render('updateDemand');
    });

};