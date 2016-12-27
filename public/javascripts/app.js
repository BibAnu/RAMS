'use strict';

var dependencies = [
    'ui.router',
    'controllers'
];

var myApp = angular.module('myApp', dependencies);

myApp.config(['$stateProvider','$urlRouterProvider','$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('/', {
            url: '/',
            controller: 'RootController'
        })

        .state('login', {
            url: '/login',
            templateUrl: '/view/login',
            controller: 'LoginController'
        })

        .state('dashboard', {
            url: '/dashboard',
            templateUrl: '/view/dashboard',
            controller: 'DashboardController'
        })

        .state('dashboardClient', {
            url: '/dashboardClient',
            templateUrl: '/view/dashboardClient',
            controller: 'DashboardClientController',
        })

        .state('dashboard.users', {
            url: '/view/user',
            templateUrl: '/dashboard/view/user',
            controller: 'UserController'
        })

        .state('dashboard.addUser', {
            url: '/add/user',
            templateUrl: '/dashboard/add/user',
            controller: 'UserController'
        })

        .state('dashboard.candidates', {
            url: '/view/candidate',
            templateUrl: '/dashboard/view/candidate',
            controller: 'CandidateController'
        })

        .state('dashboard.addCandidate', {
            url: '/add/candidate',
            templateUrl: '/dashboard/add/candidate',
            controller: 'CandidateController'
        })

        .state('dashboard.demands', {
            url: '/view/demand',
            templateUrl: '/dashboard/view/demand',
            controller: 'DemandController'
        })

        .state('dashboard.addDemand', {
            url: '/add/demand',
            templateUrl: '/dashboard/add/demand',
            controller: 'DemandController'
        })

        .state('dashboard.companies', {
            url: '/view/company',
            templateUrl: '/dashboard/view/company',
            controller: 'CompanyController'
        })

        .state('dashboard.addCompany', {
            url: '/add/company',
            templateUrl: '/dashboard/add/company',
            controller: 'CompanyController'
        })

}]);