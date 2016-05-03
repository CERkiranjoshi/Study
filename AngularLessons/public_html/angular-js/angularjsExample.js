App.controller('angularjsExample', ['$scope', '$http', function ($scope, $http) {
        $scope.init = function () {
            $scope.setTabs(1);
            $scope.myname = "kiran joshi";
            $scope.mytp = "select type";
        };
        $scope.addData = function () {
            alert($scope.myname + " " + $scope.mytp);
        };
        $scope.setTabs = function (tab) {
            $scope.tab = tab;
        };

        $scope.init();
    }]);
App.controller('repeatController', ['$scope', function ($scope) {
        $scope.names = [
            {name: 'Jani', country: 'Norway'},
            {name: 'Hege', country: 'Sweden'},
            {name: 'Kai', country: 'Denmark'}];
    }]);
App.controller('routeExample', ['$scope', "$routeParams", "$sce", "$filter", function ($scope, $routeParams, $sce, $filter) {
        console.log($routeParams);
        var orderBy = $filter('orderBy');
        $scope.tab = $routeParams.viewmode;
        if ($scope.tab == 'class' || $scope.tab == 'filter') {
            $scope.clist = [
                {id: 12, capital: 'Kabul', country: 'Afghanistan', voterage: 16},
                {id: 13, capital: 'Ottawa', country: 'Canada', voterage: 21},
                {id: 16, capital: 'Suva', country: 'Fiji', voterage: 50},
                {id: 15, capital: 'Delhi', country: 'India', voterage: 18},
                {id: 20, capital: 'Kathmandu', country: 'Nepal', voterage: 30}];
        } else if ($scope.tab == 'bindhtml') {
            $scope.htmltext = "<span style='color:red;font-size:20px;background: #fff;border-bottom: none;height: 120px;margin-top: 10px;'>kiran Joshi</span>";
            $scope.trustedHtml = $sce.trustAsHtml($scope.htmltext);
        }
        $scope.showSortOrder = function () {
            $scope.notifier({title: "success", notification: JSON.stringify($scope.clist)});
        }
        $scope.order = function (predicate, reverse) {
            $scope.predicate = predicate;
            $scope.reverse = reverse;
            $scope.clist = orderBy($scope.clist, predicate, reverse);
        };
        //$scope.order('-id', false);
        $scope.parent = {todaydate: ''};
        $scope.Showdate = function () {
            alert($scope.parent.todaydate);
        }
        $scope.data = {
            firstName: "",
            time: new Date()
        };
        $scope.count = 0;
        $scope.$watch('data.firstName', function (newValue, oldValue) {
            $scope.count += 1;
        }, true);
        $scope.updateTime = function () {
            $scope.data.time = new Date();
            //$scope.$digest() auto called with ng-click
            //  iterates through all the watches in the $scope object & update
        };
        $scope.tasks = [];
        $scope.showdata = function () {
            alert(JSON.stringify($scope.tasks))
        }
        $scope.message = "Waiting 2000ms for update";
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.message = "Timeout called!";
            });
        }, 2000);
        var counter = 0;
        $scope.customer = {
            name: 'David',
            street: '1234 Anywhere St.'
        };
        $scope.changeData = function () {
            counter++;
            $scope.customer = {
                name: 'James',
                street: counter + ' Cedar Point St.'
            };
        };
//        $scope.parentform = {todaydates: ''};
//        $scope.CSsalesVRRESave = function (motorForm) {
//            if (motorForm.$valid == true) {
//                alert($scope.ngtext)
//            } else {
//                alert("Please Enter some value");
//            }
//        };
    }]);
App.controller('testController', ['$scope', function ($scope) {
        $scope.CSsalesVRRESave = function (motorForm) {
            if (motorForm.$valid == true) {
                alert($scope.ngtext)
            } else {
                alert("Please Enter some value");
            }
        };

    }]);
App.controller('httpServices', ['$scope', "$http", "$interval", "Logger", '$rootScope', function ($scope, $http, $interval, Logger, $rootScope) {
        $http.get("data/managerdata.json")
                .success(function (response) {
                    $scope.manager = response;
                });
        $scope.blockaccounts = [];

        $scope.setData = function () {
//            $scope.notifier({title: "success", notification: JSON.stringify($scope.blockaccount)});
            // $scope.confirmationAlert({title: "success", notification: "Data Saved Successfully"});
//            $http.post("http://localhost:10080/fraudmanagment/rest/fraudAccount", $scope.blockaccount).success(function (data) {
//                console.log(data);
//            });
            $scope.blockaccounts.push($scope.blockaccount);
            $scope.setDefaultDetails();
        }
        $scope.setDefaultDetails = function () {
            $scope.blockaccount = {
                id: $scope.blockaccounts.length + 1,
                bank: "Select bank",
                blockvalue: ""
            };
        }
        $scope.getData = function () {
            $scope.filename = "blockaccounts.json";
//            $http.post("http://localhost:10080/fraudmanagment/rest/readJsonDataFromJsonFile", $scope.filename).success(function (data) {
//                $scope.blockaccounts = data;
//
//            });
        };
        $scope.actualdata = "1320";
        $scope.username = angular.copy($scope.actualdata);
        $scope.saveData = function () {
            $scope.username = $scope.actualdata;
        };
        $scope.call = function () {
            //console.log('in')
        };
        $scope.init = function () {
            $rootScope.countPromiseInterval = $interval(function () {
                $scope.call();
            }, 10000);
        };
        $scope.loggerTest = function () {
            var logger = Logger.getInstance("loginController");
            logger.log('This is a log');
            logger.warn('warn', 'This is a warn');
            logger.error('This is a {0} error! {1}', ['big', 'just kidding']);
            logger.debug('debug', 'This is a debug for line {0}', [8]);
        }
        $scope.init();
        $scope.setDefaultDetails();
    }]);
App.controller('serviceTypes', ['$scope', "$http", function ($scope, $http) {
        $scope.message = "Angular comes with different types of services. Each one with its own use cases.";
    }]);
App.controller('ContactController', ['$scope', "ContactService", function ($scope, ContactService) {
        $scope.contacts = ContactService.list();

        $scope.saveContact = function () {
            ContactService.save($scope.newcontact);
            $scope.newcontact = {};
        }
        $scope.delete = function (id) {
            ContactService.delete(id);
            if ($scope.newcontact.id == id)
                $scope.newcontact = {};
        }
        $scope.edit = function (id) {
            $scope.newcontact = angular.copy(ContactService.get(id));
        }
    }]);
App.controller('CookiesController', ['$scope', '$cookies', '$cookieStore', function ($scope, $cookies, $cookieStore) {
        var someSessionObj1 = {'innerObj': 'somesessioncookievalue1'};
        var someSessionObj2 = {'innerObj': 'somesessioncookievalue2'};
        $cookies.obj1 = someSessionObj1;
        $scope.usingCookies = {'val': $cookies.obj1};
        $cookieStore.put('obj2', someSessionObj2);
        $scope.usingCookieStore = {"val": $cookieStore.get('obj2')};

        console.log($scope.usingCookies);
        console.log($scope.usingCookieStore);
    }]);
App.controller('groupController', ['$scope', function ($scope) {
        $scope.saveToFile = function () {
            var blob = new Blob([angular.toJson($scope.blockaccounts)], {
                type: "application/json;charset=utf-8;"
            });
            console.log(window.URL.createObjectURL(blob));
        }

        $scope.saveToPc = function (data, filename) {

            if (!data) {
                console.error('No data');
                return;
            }

            if (!filename) {
                filename = 'download.json';
            }

            if (typeof data === 'object') {
                data = JSON.stringify(data, undefined, 2);
            }

            var blob = new Blob([data], {type: 'text/json'}),
                    e = document.createEvent('MouseEvents'),
                    a = document.createElement('a');

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initMouseEvent('click', true, false, window,
                    0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        };
    }]);

App.controller('multiController2', ['$scope', '$controller', function ($scope, $controller) {
        var testCtrl1ViewModel = $scope.$new(); //You need to supply a scope while instantiating.
        //Provide the scope, you can also do $scope.$new(true) in order to create an isolated scope.
        //In this case it is the child scope of this scope.
        $controller('multiController1', {$scope: testCtrl1ViewModel});
        console.log(testCtrl1ViewModel)
        var kj = testCtrl1ViewModel.myMethod(); //And call the method on the newScope.
         $scope.variable1=testCtrl1ViewModel.variable1;
         $scope.variable2=testCtrl1ViewModel.variable2;
        alert(kj)
    }]);
App.controller('multiController1', ['$scope', function ($scope) {
        $scope.variable1 = "123";
        $scope.variable2 = "456";
        $scope.myMethod = function () {
            console.log("TestCtrl1 - myMethod1" + $scope.variable1);
            console.log("TestCtrl1 - myMethod2" + $scope.variable2);
            return "123";
        }
    }]);