'use strict';

var controllers = angular.module('controllers', []);

controllers.controller('RootController', ['$scope','$http','$state', function($scope, $http, $state){
    // stmt
}]);

controllers.controller('LoginController', ['$scope','$http','$state', function($scope, $http, $state){
    $scope.login = {};

    $scope.signIn = function(){
        $http.get('/api/v1/user/all')
            .success(function(result){
                if(result.success){
                    $scope.users = result.data;
                    // console.log($scope.login);
                    // console.log($scope.users);
                    var message='';
                    for(var x=0,len=$scope.users.length; x <= len; x++ ){
                        if($scope.users[x].username!=$scope.login.uname){
                            console.log($scope.users[x]);
                            // console.log($scope.login.username);
                            message="User Not Found!";
                        } else if($scope.users[x].password!=$scope.login.pass){
                            message="Password Incorrect!";
                        } else {
                            if($scope.users[x].usertype=="Admin"){
                                $state.go('dashboard');
                            } else if($scope.users[x].usertype=="Client"){
                                $state.go('dashboardClient');
                            }
                        }
                    };
                    window.alert(message);    
                } 
            })
            .error(function(err){
                console.log(err);
            });
    };
}]);

controllers.controller('DashboardController', ['$scope','$http','$state', function($scope, $http, $state){
    // stmt
}]);

controllers.controller('DashboardClientController', ['$scope','$http','$state', function($scope, $http, $state){
    $scope.fetchCandidates = function(id){
        $http.post('/api/v1/candidate/fetch/' + $scope.getVisaNo)
            .success(function(result){
                if(result.success){
                    $scope.candidates = result.data;
                    console.log($scope.candidates);
                } else {
                    $scope.candidates = [];
                }
            })
            .error(function(err){
                console.log(err);
            });
    };
}]);

controllers.controller('UserController', ['$scope','$http','$state', function($scope, $http, $state){
    $scope.users = [];
    $scope.newUser = {};
    $scope.editRow = [];
    $scope.items = ['Admin','Client']
    $scope.sortType     = 'id'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchUser   = '';     // set the default search/filter term

    $scope.getAllUsers = function(){
        $http.get('/api/v1/user/all')
            .success(function(result){
                if(result.success){
                    $scope.users = result.data;
                } else {
                    $scope.users = [];
                }
            })
            .error(function(err){
                console.log(err);
            });
    };

    $scope.getAllUsers();

    $scope.addUser = function(){
        $http.post('/api/v1/user/add', $scope.newUser)
            .success(function(result){
                if(result.success){
                    $state.go('dashboard.users');
                }

            })
            .error(function(err){
                console.log(err);
            });
    };
    $scope.deleteUser = function(id){
            if(confirm("Are you sure, you want to delete this ?"))
            {
                $http.post('/api/v1/user/delete/' + id)
                    .success(function(result){
                        if(result.success){
                            $state.go('dashboard');
                        }
                    })
                .error(function(err){
                    console.log(err);
                });
            }
    }
    $scope.editUser = function(user){

            $scope.editRow = {};
            $scope.editRow[user.user_id] = true;
        
        };

    $scope.saveUser = function(id, user) {

            $scope.editRow[user.user_id] = false;
            $http.put('/api/v1/user/update/' + id, user)
            .success(function(result){
                if(result.success){
                    $scope.getAllUsers();
                }

            })
            .error(function(err){
                console.log(err);
            });

        };
}]);


controllers.controller('CandidateController', ['$scope','$http','$state', function($scope, $http, $state){
    $scope.candidates = [];
    $scope.newCandidate = {};
    $scope.items = ['Pending','Visa Stamped','Visa in Process','Medical in Process','Medical Fit','Medical Unfit','Ticket in Process','Ticket Confirmed','Departed from Nepal'];
    $scope.visa = [];

    $scope.getAllCandidates = function(){
        $http.get('/api/v1/candidate/all')
            .success(function(result){
                if(result.success){
                    $scope.candidates = result.data;
                } else {
                    $scope.candidates = [];
                }
            })
            .error(function(err){
                console.log(err);
            });
    };

    $scope.getAllCandidates();

    $scope.addCandidate = function(){
        $http.post('/api/v1/candidate/add', $scope.newCandidate)
            .success(function(result){
                if(result.success){
                    $state.go('dashboard.candidates');
                }
            })
            .error(function(err){
                console.log(err);
            });
    };
    $scope.deleteCandidate = function(id){
            if(confirm("Are you sure, you want to delete this ?"))
            {
                $http.post('/api/v1/candidate/delete/' + id)
                    .success(function(result){
                        if(result.success){
                            $state.go('dashboard');
                        }
                    })
                .error(function(err){
                    console.log(err);
                });
            }
    };
    $scope.editCandidate = function(candidate){

            $scope.editRow = {};
            $scope.editRow[candidate.id] = true;
        
        };

    $scope.saveCandidate = function(id, candidate) {

            $scope.editRow[candidate.id] = false;
            $http.put('/api/v1/candidate/update/' + id, candidate)
            .success(function(result){
                if(result.success){
                    $state.go('dashboard.candidates');
                }

            })
            .error(function(err){
                console.log(err);
            });

        };
    $scope.getVisaNo = function(){
        $http.get('/api/v1/demand/all/')
            .success(function(result){
                if(result.success){
                    $scope.visa = result.data;
                } else {
                    $scope.visa = [];
                }
            })
            .error(function(err){
                console.log(err);
            });
    }
    $scope.getVisaNo();
}]);

controllers.controller('DemandController', ['$scope','$http','$state', function($scope, $http, $state){
    $scope.demands = [];
    $scope.newDemand = {};
    $scope.items = [];

    $scope.getAllDemands = function(){
        $http.get('/api/v1/demand/all')
            .success(function(result){
                if(result.success){
                    $scope.demands = result.data;
                } else {
                    $scope.demands = [];
                }
            })
            .error(function(err){
                console.log(err);
            });
    };

    $scope.getAllDemands();

    $scope.addDemand = function(){
        $http.post('/api/v1/demand/add', $scope.newDemand)
            .success(function(result){
                if(result.success){
                    $state.go('dashboard.demands');
                }
            })
            .error(function(err){
                console.log(err);
            });
    };
    
    $scope.editDemand = function(demand){

            $scope.editRow = {};
            $scope.editRow[demand.id] = true;
        
        };

    $scope.saveDemand = function(id, demand) {

            $scope.editRow[demand.id] = false;
            $http.put('/api/v1/demand/update/' + id, demand)
            .success(function(result){
                if(result.success){
                    $state.go('dashboard.demands');
                }

            })
            .error(function(err){
                console.log(err);
            });

        };
    $scope.deleteDemand = function(id){
            if(confirm("Are you sure, you want to delete this ?"))
            {
                $http.post('/api/v1/demand/delete/' + id)
                    .success(function(result){
                        if(result.success){
                            $state.go('dashboard');
                        }
                    })
                .error(function(err){
                    console.log(err);
                });
            }
    };
    $scope.getCompanyName = function(){
        $http.get('/api/v1/company/all/')
            .success(function(result){
                if(result.success){
                    $scope.items = result.data;
                    console.log($scope.items);
                } else {
                    $scope.items = [];
                }
            })
            .error(function(err){
                console.log(err);
            });
    }
    $scope.getCompanyName();
}]);

controllers.controller('CompanyController', ['$scope','$http','$state', function($scope, $http, $state){
    $scope.companies = [];
    $scope.newCompany = {};

    $scope.getAllCompanies = function(){
        $http.get('/api/v1/company/all')
            .success(function(result){
                if(result.success){
                    $scope.companies = result.data;
                } else {
                    $scope.companies = [];
                }
            })
            .error(function(err){
                console.log(err);
            });
    };

    $scope.getAllCompanies();

    $scope.addCompany = function(){
        $http.post('/api/v1/company/add', $scope.newCompany)
            .success(function(result){
                if(result.success){
                    $state.go('dashboard.companies');
                }
            })
            .error(function(err){
                console.log(err);
            });
    };

    $scope.editCompany = function(company){

            $scope.editRow = {};
            $scope.editRow[company.id] = true;
        
        };

    $scope.saveCompany = function(id, company) {

            $scope.editRow[company.id] = false;
            $http.put('/api/v1/company/update/' + id, company)
            .success(function(result){
                if(result.success){
                    $state.go('dashboard.companies');
                }

            })
            .error(function(err){
                console.log(err);
            });

        };
    $scope.deleteCompany = function(id){
            if(confirm("Are you sure, you want to delete this ?"))
            {
                $http.post('/api/v1/company/delete/' + id)
                    .success(function(result){
                        if(result.success){
                            $state.go('dashboard');
                        }
                    })
                .error(function(err){
                    console.log(err);
                });
            }
    }
}]);