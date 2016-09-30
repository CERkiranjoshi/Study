App.controller('bijouDashboard', ['$scope', '$rootScope', '$http', '$q', '$interval', '$timeout', 'URL_LINKS', function ($scope, $rootScope, $http, $q, $interval, $timeout, URL_LINKS) {
        $scope.init = function () {
            $scope.colors = [];
            $scope.colorsarr = [];
            $scope.getTeamInfo();
            $scope.getNewsFeed();
            $scope.lastfeedId = 0;
            var id = parseInt(localStorage.getItem("lastfeedId"));
            if (id != null) {
                $scope.lastfeedId = id;
            }
            $rootScope.countPromiseInterval = $interval(function () {
//                $http.get("data/feeds.json").success(function (data) {
                $http.get("http://114.143.76.237/shopping/feeds/").success(function (data) {
                    if (data.feeds.length > 0 && $scope.feeds.length == 0) {
                        $scope.feeds = data.feeds;
                        $scope.updateFeed();
                    } else if (data.feeds.length > 0) {
                        $scope.newfeeds = data.feeds;
                        for (var i = 0; i < $scope.newfeeds.length; i++) {
                            var num = parseInt($scope.newfeeds[i].id)
                            if (num > $scope.lastfeedId) {
                                $('.vticker ul').append('<li class="list-group-item list-group-item-' + $scope.newfeeds[i].product_colour.toLowerCase() + '">' + $scope.newfeeds[i].user + '  from ' + $scope.newfeeds[i].team_name + ' has bought ' + $scope.newfeeds[i].product + '.</li>');
                                $scope.lastfeedId = num;
                                localStorage.setItem("lastfeedId", num);
                            }
                        }
                    }
                });
            }, 10000);
            $rootScope.countPromiseIntervalTeam = $interval(function () {
                $scope.getTeamInfo();
            }, 10000);
        };
        $scope.getBuyProducts = function (teamname) {
            //return Math.floor(Math.random() * 15) + 1;
            var pb = 0
            for (var i = 0; i < $scope.teams.length; i++) {
                if ($scope.teams[i].team_name == teamname) {
                    pb = $scope.teams[i].products_bought;
                    break;
                }
            }
            return pb;
        }
        $scope.drawColumnGraph = function () {
            if ($scope.colors.length == 0) {
                return;
            }
            $timeout(function () {
                var option = angular.copy($scope.googlecharts);
                var gdata = [];
                option.vAxis.title = "Products Purchased";
                gdata[0] = ["Team Name", "product", {role: "style"}];
                var j = 1;
                for (var i = 0; i < $scope.colors.length; i++) {
                    var teamname = $scope.colors[i].team_name;
                    var tp = [];
                    tp.push(teamname);
                    tp.push($scope.getBuyProducts($scope.colors[i].team_name));

                    var st = 'stroke-color: #000000; stroke-width: 1; fill-color: ' + $scope.colors[i].color;
                    tp.push(st);

                    gdata[j] = tp;
                    j++;
                }
                var data = google.visualization.arrayToDataTable(gdata);
//                option.width = 620;
                option.height = 285;
                var sdcsColumnGraph = new google.visualization.ColumnChart(document.getElementById('gameoflooks'));
                sdcsColumnGraph.draw(data, option);
            }, 500);
        }
        $scope.getChartConfig = function () {
            $http.get("data/googlecharts.json").success(function (data) {
                $scope.googlecharts = data;
                $scope.googlecharts.colors = $scope.colorsarr;
                $scope.drawColumnGraph();
            });
        };
        $scope.getTeamInfo = function () {
//            $http.get("data/teams.json").success(function (data) {
            $http.get("http://114.143.76.237/shopping/dashboard/").success(function (data) {
                $scope.teams = data;
                if ($scope.colors.length == 0 && $scope.colorsarr.length == 0) {
                    for (var i = 0; i < $scope.teams.length; i++) {
                        $scope.colorsarr.push($scope.teams[i].colour_hex);
                        var obj = {};
                        obj.id = i + 1;
                        obj.color = $scope.teams[i].colour_hex;
                        obj.team_colour = $scope.teams[i].team_colour;
                        obj.team_name = $scope.teams[i].team_name;
                        $scope.colors.push(obj);
                    }
                }
                $scope.getChartConfig();
                $timeout(function () {
                    $scope.clearData();
                }, 3000);
            });
        }
        $scope.clearData = function () {
            var rankCount = 0;
            for (var i = 0; i < $scope.teams.length; i++) {
                if ($scope.teams[i].team_rank > 0) {
                    rankCount++;
//                    if (rankCount == 1) {
                    if (rankCount == $scope.teams.length) {
                        window.dd.stop();
                        $scope.clearInterval();
                    }
                }
            }
        }
        $scope.updateFeed = function () {
            if ($scope.feeds.length > 0) {
                $scope.lastfeedId = parseInt($scope.feeds[$scope.feeds.length - 1].id);
                localStorage.setItem("lastfeedId", $scope.lastfeedId);
                //http://api.jqueryui.com/easings/
                $timeout(function () {
                    var wd = $(".vticker").width();
                    $('.news-item').css('width', wd + "px");

                    window.dd = $('.vticker').easyTicker({
                        direction: 'up',
                        easing: 'swing',
                        speed: 'slow',
                        interval: 2000,
                        height: 'auto',
                        visible: 7,
                        mousePause: 0,
                        controls: {
                            up: '.up',
                            down: '.down',
                            toggle: '.toggle',
                            stopText: 'Stop !!!'
                        }
                    }).data('easyTicker');
                }, 500)
            } else {
                localStorage.setItem("lastfeedId", 0);
            }
        }
        $scope.getNewsFeed = function () {
            $http.get("http://114.143.76.237/shopping/feeds/").success(function (data) {
//            $http.get("data/feeds.json").success(function (data) {
                $scope.feeds = data.feeds;
                $scope.updateFeed();
            });
        }
        $scope.init();
    }]);
