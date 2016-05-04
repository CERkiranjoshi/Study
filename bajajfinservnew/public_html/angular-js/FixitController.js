var Fixitcontroller = function($scope, $http,$rootScope) {
//myApp.controller('fixitcontroller', ['$scope', '$http', function ($scope, $http) {
        $scope.sample = 'Sample';
        // id =1 =top solution , 2 =Windiws , 3 IE , 4: Office 5v : Other
        
				$scope.getdata = function () {
            $http.get("../PixelAdmin-1.3.0/angular-js/js/data/issuelist.json")
                    .success(function (response) {
                        $scope.issues = response;

                    });
            $http.get("../PixelAdmin-1.3.0/angular-js/js/data/solnlistall.json")
                    .success(function (response) {
                        $scope.allsolutions = response;

                    });
        }
        $scope.alltabs = {
            1: {name:"Top Solutions",image:"../PixelAdmin-1.3.0/angular-js/images/fisc_icon_100000.png",hover:"../PixelAdmin-1.3.0/angular-js/images/fisc_icon_100000H.png"},
            2: {name:"Windows",image:"../PixelAdmin-1.3.0/angular-js/images/fisc_icon_200000.png",hover:"../PixelAdmin-1.3.0/angular-js/images/fisc_icon_200000H.png"},
            3: {name:"Internet Explorer",image:"../PixelAdmin-1.3.0/angular-js/images/fisc_icon_300000.png",hover:"../PixelAdmin-1.3.0/angular-js/images/fisc_icon_300000H.png"},
            4: {name:"Office",image:"../PixelAdmin-1.3.0/angular-js/images/fisc_icon_600000.png",hover:"../PixelAdmin-1.3.0/angular-js/images/fisc_icon_600000H.png"},
            5: {name:"Other",image:"../PixelAdmin-1.3.0/angular-js/images/fisc_icon_800000.png",hover:"../PixelAdmin-1.3.0/angular-js/images/fisc_icon_800000H.png"}
        };
        $scope.innerDetails = [];
        $scope.currentSelectedArea = "";
//        /$scope.currentSelectedIssue = {id: 0};
        $scope.currentSelectedIssue = {
            "id": "1",
            "areaid": "1",
            "text": "All problem areas",
            "details": []
        };
        $scope.selectedIssues = [];
        $scope.initSetup = function () {
            for (var i = 0; i <= $scope.issues.length; i++) {
                if ($scope.tab == $scope.issues[i].areaid) {
                    $scope.currentSelectedIssue = $scope.issues[i];
                    break;
                }
            }
        }
        $scope.setTabs = function (tab) {
            $scope.tab = tab;
            $scope.currentSelectedArea = $scope.alltabs[$scope.tab].name;
            for (var i = 1; i <= 5; i++) {
                $("#image_" + i).attr("src", $scope.alltabs[i].image);
            }
            $("#image_" + tab).attr("src", $scope.alltabs[$scope.tab].hover);

        }
        $scope.setTabs(1);
        $scope.getdata();
//        setTimeout(function () {
//            $scope.initSetup();
//        }, 500);
        $scope.byTab = function (issue) {
            if ($scope.tab == issue.areaid) {
                return true;
            } else {
                return false;
            }
        }
        $scope.setIssueTopic = function (issue) {
            $scope.currentSelectedIssue = issue;
        }
		
		
		$scope.byIssuetype = function (soln) {
			if (soln.issuetypeids.indexOf($scope.currentSelectedIssue.id) > -1) {
				return true;
			} else {
				return false;
			}
		}

    };