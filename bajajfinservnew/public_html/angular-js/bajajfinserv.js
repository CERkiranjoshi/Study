
App.controller('validatetest', ['$scope', '$http', function ($scope, $http) {
        $scope.sample = 'Sample';
        $scope.setDefault = function () {
            $scope.details = {
                gender: "male",
                state: "",
                birthday: {
                    bdate: "DD",
                    bmonth: "MMM",
                    byear: "YYYY"
                },
                searchemp: undefined,
                selectCity: "Select City*"
            };
        }
        $scope.citys = [
            {
                "city": "Surat",
                "state": "GUJARAT"

            }, {
                "city": "Ahmedabad",
                "state": "GUJARAT"

            }, {
                "city": "Gurgaon",
                "state": "HARYANA"

            }, {
                "city": "Bangalore",
                "state": "KARNATAKA"

            }, {
                "city": "Chennai",
                "state": "TAMILNADU"

            }, {
                "city": "Delhi",
                "state": "Delhi"

            }, {
                "city": "Faridabad",
                "state": "HARYANA"

            }, {
                "city": "Ghaziabad",
                "state": "UTTAR PRADESH"

            }, {
                "city": "Hyderabad",
                "state": "ANDHRA PRADESH"

            }, {
                "city": "Mumbai",
                "state": "MAHARASHTRA"

            }, {
                "city": "Noida",
                "state": "UTTAR PRADESH"

            }, {
                "city": "JAIPUR",
                "state": "RAJASTHAN"

            }, {
                "city": "BARODA",
                "state": "GUJARAT"

            }];
        $scope.Employers = ["ATOS", "ATOS ORRIGIN", "IBM", "HCL", "DELL", "OTHERS"];
        $scope.allUsers = [];
        $scope.validatedata = function () {
            $http.post("http://localhost:10080/fraudmanagment/rest/readJsonDataFromJsonFile", "bajajfinserv.json").success(function (data) {
                if (data.exception == undefined) {
                    $scope.details.submittedon = new date();
                    $scope.allUsers = data;
                    $scope.allUsers.push($scope.details);
                    $scope.addData();
                }
            });
        };
        $scope.addData = function () {
            $http.post("http://156.150.119.56:10080/mwpusdclient/rest/writeJsonDataIntoFile", $scope.allUsers).success(function (data) {
                $scope.setDefault();
            });
        }
        $scope.showul = true;
        $scope.searchByemp = function (emp) {
            if ($scope.details.searchemp != "" && $scope.details.searchemp != undefined) {
                if (emp.toLowerCase().indexOf($scope.details.searchemp.toLowerCase()) != -1) {
                    return emp;
                }
            } else {
                $scope.showul = true;
            }
        }
        $scope.setEmp = function (emp) {
            $scope.details.searchemp = emp;
            $scope.showul = false;

        }
        $scope.doChange = function () {
            $("#state").val("");
            var obj = JSON.parse($scope.details.selectCity);
            $scope.details.state = obj.state;
            $("#state").val(obj.state);
        }
        $scope.getdata = function () {
            IN.API.Raw('/people/~:(email-address,id,first-name,last-name,maiden-name,formatted-name,headline,industry,positions,num-connections,picture-url,location)?format=json').method("GET").body().result($scope.ShowProfileData);
//            IN.API.Profile("me").fields("id", "first-name", "last-name", "phoneNumbers", "email-address", "positions", "date-of-birth", "industry", "headline", "summary", "num-connections").result(function (data) {
//                var profiles = data.values[0];
//                console.log(profiles)
//                $scope.details.fname = profiles.firstName;
//                $scope.details.lname = profiles.lastName;
//                $scope.details.email = profiles.emailAddress;
//                $scope.details.searchemp = profiles.headline;
//                $scope.details.id = profiles.id;
//                $scope.$apply();
//                IN.User.logout();
//            }).error(function (data) {
//                console.log(data);
//            });
        }

        $scope.doLogin = function () {
            if (IN.User.isAuthorized() == false) {
                IN.User.authorize($scope.getdata);
            } else {
                $scope.getdata();
            }

        }
        $scope.simpleStringify = function (object) {
            var simpleObject = {};
            for (var prop in object) {
                if (!object.hasOwnProperty(prop)) {
                    continue;
                }
                if (typeof (object[prop]) == 'object') {
                    continue;
                }
                if (typeof (object[prop]) == 'function') {
                    continue;
                }
                simpleObject[prop] = object[prop];
            }
            var cleanedJson = JSON.stringify(simpleObject);
            return cleanedJson;
        }
        $scope.setDefault();
        $scope.ShowProfileData = function (profiles) {
            console.log(profiles);
//            $scope.details.fname = profiles.firstName;
//            $scope.details.lname = profiles.lastName;
//            $scope.details.id = profiles.id;
//            $scope.$apply();
        }
    }]);