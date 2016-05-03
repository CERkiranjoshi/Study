App.controller('AdditiveManufacturing', ['$scope', '$http', '$q', '$timeout', function ($scope, $http, $q, $timeout) {
        $scope.init = function () {
            $scope.selectedIndustry = 0;
            $scope.selectedModel = 0;
            $scope.mainTab = 1;
            $scope.itemsByPage = 7
        };
        $scope.setTabs = function (tab) {
            //$scope.tab = tab;
        };
        $scope.setMainTab = function (tab) {
            $scope.mainTab = tab;
            if (tab == 2) {
                $scope.tab = 1;
            }
        };
        $scope.setIndustry = function (ind) {
            $scope.selectedIndustry = ind.id;
            $scope.selectedModel = 0;
        };
        $scope.setModel = function (mod) {
            $scope.selectedModel = mod.id;
        };
        $scope.setNext = function () {
            var max = 6;
            if ($scope.tab == max) {
                return;
            }
            $scope.tab++;
        }
        $scope.setBack = function () {
            var min = 1;
            if ($scope.tab == min) {
                return;
            }
            $scope.tab--;
        }
        $http.get("data/IndustryModels.json")
                .success(function (response) {
                    $scope.industry = response.industry;
                    $scope.models = response.models;
                });
        $scope.init();
        $scope.getPrinterStatusDetails = function () {
            var deferred = $q.defer();
            var promise = deferred.promise;
//            $timeout(function () {
            $http.get("data/printerStatusDetails.json").success(function (data) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
            });
            promise.then(function (data) {
                $scope.printerStatusDetails = data;
                //$scope.checkCondition(1);
                //  $scope.checkCondition();
            }, function () {
                //console.log('if failer);
            });
//            }, 5000);

        };
        $scope.conditionalIf = function (type,value) {
            if ($scope.configParam[type].length == 0) {
                return true;
            } else if($scope.configParam[type].length > 0 && $scope.configParam[type].indexOf(value) > -1) {
                return true;
            }else{
                return false
            }
        }
        $scope.checkCondition = function (level) {//level filtering
//            if (level == 0) {
//                return true;
//            }
            if (level == 1 && $scope.conditionalIf('printerStatusDetails')) {
                console.log('in')
            }
        }
        
        $scope.getPrinterStatusDetails();
    }]);
