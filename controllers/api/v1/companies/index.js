'use strict';

var path = require('path');
var basePath = path.resolve();
var config = require(basePath + '/config/config');
var v1 = config.versions.v1.prefix;
var companies = require('./companies');
var mw = require(basePath + '/middlewares/response');

module.exports = function(app){

    // API to fetch all active companies from companies table
    app.get(v1 + '/company/all', companies.fetchAllCompanies, mw.respond, mw.error);
    
    // API to add a company to the companies table
    app.post(v1 + '/company/add', companies.addCompany, mw.respond, mw.error);

    // API to update a company to the companies table
    app.put(v1 + '/company/update/:id', companies.updateCompany, mw.respond, mw.error);

    // API to delete a company to the companies table
    app.post(v1 + '/company/delete/:id', companies.deleteCompany, mw.respond, mw.error);

    // API to restore a company to the companies table
    app.get(v1 + '/company/restore/:id', companies.restoreCompany, mw.respond, mw.error);
};