App.controller('WhirlpoolDashboard', ['$scope', '$http', '$q', '$timeout', 'URL_LINKS', function ($scope, $http, $q, $timeout, URL_LINKS) {
        $scope.init = function () {
            $scope.selectedIndustry = 0;
            $scope.selectedModel = 0;
            $scope.colors = URL_LINKS.colors;
            $scope.getChartConfig();
            $scope.setMainTab(1);
        };
        $scope.setTabs = function (tab) {
            //$scope.tab = tab;
        };
        $scope.setMainTab = function (tab) {
            $scope.mainTab = tab;
            if ($scope.mainTab == 1) {
                $scope.drawDonutGraph();
                $scope.drawColumnGraph();
                $scope.drawBarGraph();
            } else if ($scope.mainTab == 2) {
                $scope.region = undefined;
                $scope.selectedYear = undefined;
                $scope.drawRegionBarGraph();
            } else if ($scope.mainTab == 3) {
                $scope.selectedArea = undefined;
                $scope.drawSPWisePerformance();
            } else if ($scope.mainTab == 4) {
                $scope.selectedEG = undefined;
                $scope.drawFinalData();
            }
        };
        $scope.drawDonutGraph = function () {
            $timeout(function () {
                var options = $scope.getDountConfig();
                var per = "86";
                var col = $scope.getComplianceColor(per);
                options.slices = {0: {color: col}};
                var data = google.visualization.arrayToDataTable([
                    ['All India', '%Target'],
                    ['Target', per]
                ]);
                var chart = new google.visualization.PieChart(document.getElementById('sdcsDonutGraph'));
                chart.draw(data, options);
            }, 500);
        };
        $scope.getComplianceColor = function (per) {
            for (var i = 0; i < $scope.colors.length; i++) {
                if (per >= Number($scope.colors[i].min) && per <= Number($scope.colors[i].max)) {
                    return $scope.colors[i].color;
                }
            }
        }
        $scope.getComplianceFontColor = function (per) {
            for (var i = 0; i < $scope.colors.length; i++) {
                if (per >= Number($scope.colors[i].min) && per <= Number($scope.colors[i].max)) {
                    return $scope.colors[i].fontcolor;
                }
            }
        }
        $scope.drawColumnGraph = function () {
            $timeout(function () {
                var option = angular.copy($scope.googlecharts);
                option.bar.groupWidth = 74;
                var temparr = [
                    ["Month", "Target", {role: "style"}],
                    ["February'16", 73, $scope.getComplianceColor(73)],
                    ["March'16", 90, $scope.getComplianceColor(90)],
                    ["April'16", 80, $scope.getComplianceColor(80)]
                ];
                var data = google.visualization.arrayToDataTable(temparr);
                option.width = 400;
                option.height = 200;
                var sdcsColumnGraph = new google.visualization.ColumnChart(document.getElementById('sdcsColumnGraph'));
                sdcsColumnGraph.draw(data, option);
            }, 500);
        }
        $scope.drawBarGraph = function () {
            $scope.BarData = [{
                    "month": "Jan",
                    "year-2015": 72,
                    "year-2016": 91
                }, {
                    "month": "Feb",
                    "year-2015": 68,
                    "year-2016": 79
                }, {
                    "month": "Mar",
                    "year-2015": 74,
                    "year-2016": 92
                }, {
                    "month": "Apr",
                    "year-2015": 81,
                    "year-2016": 80
                }, {
                    "month": "May",
                    "year-2015": 68,
                    "year-2016": 0
                }, {
                    "month": "Jun",
                    "year-2015": 74,
                    "year-2016": 0
                }, {
                    "month": "Jul",
                    "year-2015": 82,
                    "year-2016": 0
                }, {
                    "month": "Aug",
                    "year-2015": 68,
                    "year-2016": 0
                }, {
                    "month": "Sep",
                    "year-2015": 74,
                    "year-2016": 0
                }, {
                    "month": "Oct",
                    "year-2015": 72,
                    "year-2016": 0
                }, {
                    "month": "Nov",
                    "year-2015": 89,
                    "year-2016": 0
                }, {
                    "month": "Dec",
                    "year-2015": 74,
                    "year-2016": 0
                }];
            $timeout(function () {
                var gdata = [];
                gdata[0] = ['Month', '2015', '2016'];
                var j = 1;
                for (var i = 0; i < $scope.BarData.length; i++) {
                    var tp = [];
                    tp.push($scope.BarData[i].month);
                    tp.push($scope.BarData[i]['year-2015']);
                    tp.push($scope.BarData[i]['year-2016']);
                    gdata[j] = tp;
                    j++;
                }
                var data = google.visualization.arrayToDataTable(gdata);
                var option = angular.copy($scope.googlecharts);
                option.width = 650;
                option.height = 300;
                option.colors = ['#66CC00', '#FF0000'];
                var chart = new google.charts.Bar(document.getElementById('sdcsBarGraph'));
                chart.draw(data, option);
            }, 500);
        };
        $scope.drawRegionBarGraph = function () {
            $scope.regionBarData = [{
                    "region": "North",
                    "year-2015": 72,
                    "year-2016": 91
                }, {
                    "region": "Central",
                    "year-2015": 68,
                    "year-2016": 79
                }, {
                    "region": "East",
                    "year-2015": 74,
                    "year-2016": 92
                }, {
                    "region": "West",
                    "year-2015": 81,
                    "year-2016": 80
                }, {
                    "region": "South",
                    "year-2015": 68,
                    "year-2016": 81
                }];
            $timeout(function () {
                var gdata = [];
                gdata[0] = ['Month', '2015', '2016'];
                var j = 1;
                for (var i = 0; i < $scope.regionBarData.length; i++) {
                    var tp = [];
                    tp.push($scope.regionBarData[i].region);
                    tp.push($scope.regionBarData[i]['year-2015']);
                    tp.push($scope.regionBarData[i]['year-2016']);
                    gdata[j] = tp;
                    j++;
                }
                var data = google.visualization.arrayToDataTable(gdata);
                var chart = new google.charts.Bar(document.getElementById('regionGraph'));
                var option = angular.copy($scope.googlecharts);
                option.width = 500;
                option.height = 350;
                option.colors = ['#66CC00', '#FF0000'];
                var getDataByRegion = function () {
                    var selectedItem = chart.getSelection()[0];
                    $scope.region = undefined;
                    $scope.selectedYear = undefined;
                    if (selectedItem) {
                        $scope.region = data.getValue(selectedItem.row, 0);
                        if (selectedItem.column == 1) {
                            $scope.selectedYear = 2015;
                        } else {
                            $scope.selectedYear = 2016;
                        }
//                        var temp = $scope.regionBarData[selectedItem.row];
//                        angular.forEach(temp, function (key, value) {
//                            console.log(key)
//                            console.log(value)
//                        });
                        $scope.drawRegionCityBarGraph();
                    }
                    $scope.$apply();
                };
                google.visualization.events.addListener(chart, 'select', getDataByRegion);
                chart.draw(data, option);
            }, 500);
        }
        $scope.drawRegionCityBarGraph = function () {
            $scope.regionCityBarData = [{
                    "region": "Ahemdabad",
                    "year-2015": 89,
                    "year-2016": 91
                }, {
                    "region": "Mumbai",
                    "year-2015": 54,
                    "year-2016": 79
                }, {
                    "region": "Pune",
                    "year-2015": 85,
                    "year-2016": 92
                }, {
                    "region": "Goa",
                    "year-2015": 81,
                    "year-2016": 79
                }, {
                    "region": "Indore",
                    "year-2015": 54,
                    "year-2016": 81
                }];
            $timeout(function () {
                var gdata = [];
                // gdata[0] = ['Month', '2015', '2016'];
                gdata[0] = ['Month', '2016', {role: "style"}];
                var j = 1;
                for (var i = 0; i < $scope.regionCityBarData.length; i++) {
                    var tp = [];
                    tp.push($scope.regionCityBarData[i].region);
                    //tp.push($scope.regionCityBarData[i]['year-2015']);
                    tp.push($scope.regionCityBarData[i]['year-2016']);
//                    tp.push("Red");
                    tp.push($scope.getComplianceColor($scope.regionCityBarData[i]['year-2016']));
                    gdata[j] = tp;
                    j++;
                }
                var data = google.visualization.arrayToDataTable(gdata);
                var option = angular.copy($scope.googlecharts);
                option.width = 500;
                option.height = 350;
                option.bar.groupWidth = 74;
                option.legend = 'none';
                //$scope.googlecharts.colors = ['#66CC00', '#FF0000'];

                var chart = new google.visualization.ColumnChart(document.getElementById('cityGraph'));
                var setDataByCity = function () {
                    var selectedItem = chart.getSelection()[0];
                    $scope.city = undefined;
                    if (selectedItem) {
                        $scope.city = data.getValue(selectedItem.row, 0);
//                        var temp = $scope.regionBarData[selectedItem.row];
//                        angular.forEach(temp, function (key, value) {
//                            console.log(key)
//                            console.log(value)
//                        });
                        $scope.setMainTab(3);
                    }
                    $scope.$apply();
                };
                google.visualization.events.addListener(chart, 'select', setDataByCity);
                chart.draw(data, option);
            }, 500);
        }
        $scope.drawSPWisePerformance = function () {
            $http.get("data/spdata.json").success(function (data) {
                $scope.SPWiseData = data;
            });
            $timeout(function () {
                var gdata = [];
                gdata[0] = ['SP', 'Target'];
                var j = 1;
                for (var i = 0; i < $scope.SPWiseData.length; i++) {
                    var tp = [];
                    tp.push(j);
                    tp.push($scope.SPWiseData[i]['year-2016']);
                    gdata[j] = tp;
                    j++;
                }
                var data = google.visualization.arrayToDataTable(gdata);
                var option = angular.copy($scope.googlecharts);
                option.width = 500;
                option.height = 300;
                option.series = {};
                option.series = {
                    0: {pointShape: 'star'}};
                option.vAxis = {minValue: 0, maxValue: 100, ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], gridlines: {
                        count: 10
                    }};
                option.pointSize = 20;
//                $scope.googlecharts.colors = ['#66CC00', '#FF0000'];
                option.colors = ['#005F96', '#66CC00', '#FF0000'];
                option.legend = 'none';
                var chart = new google.visualization.ScatterChart(document.getElementById('spDataGraph'));
                var setDataBySP = function () {
                    var selectedItem = chart.getSelection()[0];
                    console.log(selectedItem)
                    $scope.selectedArea = undefined;
                    if (selectedItem) {
                        $scope.selectedArea = true;
                        var range = data.getValue(selectedItem.row, 1);
                        $scope.drawSPWisePerformanceBasedOnSelectedArea(range);
                    }
                    $scope.$apply();
                };
                google.visualization.events.addListener(chart, 'select', setDataBySP);
                chart.draw(data, option);
            }, 500);
        };
        $scope.drawSPWisePerformanceBasedOnSelectedArea = function (range) {
            var arr = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
            var max = 0;
            for (var i = 0; i <= arr.length; i++) {
                if (arr[i] >= range) {
                    max = arr[i];
                    break;
                }
            }
            var min = max - 10;
            var filterdata = [];
            for (var i = 0; i < $scope.SPWiseData.length; i++) {
                if ($scope.SPWiseData[i]['year-2016'] >= min && $scope.SPWiseData[i]['year-2016'] <= max) {
                    filterdata.push($scope.SPWiseData[i]);
                }

            }
            $scope.filterSPData = filterdata;
            $timeout(function () {
                var gdata = [];
                gdata[0] = ['SP', '2016', {role: "style"}];
                var j = 1;
                for (var i = 0; i < $scope.filterSPData.length; i++) {
                    var tp = [];
                    tp.push($scope.filterSPData[i].sp);
                    tp.push($scope.filterSPData[i]['year-2016']);
                    tp.push($scope.getComplianceColor($scope.filterSPData[i]['year-2016']));
                    gdata[j] = tp;
                    j++;
                }
                var data = google.visualization.arrayToDataTable(gdata);
                var option = angular.copy($scope.googlecharts);
                option.width = 500;
                option.height = 300;
                option.bar.groupWidth = 34;
                option.colors = ['#66CC00', '#FF0000'];
                option.legend = 'none';
                var chart = new google.visualization.ColumnChart(document.getElementById('selectedSPGraph'));
                var setDataByCity = function () {
                    var selectedItem = chart.getSelection()[0];
                    $scope.selectedSP = undefined;
                    if (selectedItem) {
                        $scope.selectedSP = data.getValue(selectedItem.row, 0);
                        $scope.setMainTab(4);
                    }
                    $scope.$apply();
                };
                google.visualization.events.addListener(chart, 'select', setDataByCity);
                chart.draw(data, option);
            }, 500);

        };
        $scope.drawFinalData = function () {
            $scope.egWiseData = [{
                    "eg": "EG1",
                    "year-2015": 89,
                    "year-2016": 91
                }, {
                    "eg": "EG2",
                    "year-2015": 54,
                    "year-2016": 79
                }, {
                    "eg": "EG3",
                    "year-2015": 85,
                    "year-2016": 92
                }, {
                    "eg": "EG4",
                    "year-2015": 81,
                    "year-2016": 79
                }, {
                    "eg": "EG5",
                    "year-2015": 54,
                    "year-2016": 56
                }, {
                    "eg": "EG6",
                    "year-2015": 89,
                    "year-2016": 91
                }, {
                    "eg": "EG7",
                    "year-2015": 54,
                    "year-2016": 65
                }, {
                    "eg": "EG8",
                    "year-2015": 85,
                    "year-2016": 92
                }, {
                    "eg": "EG9",
                    "year-2015": 81,
                    "year-2016": 89
                }];
            $timeout(function () {
                var gdata = [];
                // gdata[0] = ['Month', '2015', '2016'];
                gdata[0] = ['SP', '2016', {role: "style"}];
                var j = 1;
                for (var i = 0; i < $scope.egWiseData.length; i++) {
                    var tp = [];
                    tp.push($scope.egWiseData[i].eg);
                    tp.push($scope.egWiseData[i]['year-2016']);
                    tp.push($scope.getComplianceColor($scope.egWiseData[i]['year-2016']));
                    gdata[j] = tp;
                    j++;
                }
                var data = google.visualization.arrayToDataTable(gdata);
                var option = angular.copy($scope.googlecharts);
                option.width = 300;
                option.height = 300;
                option.bar.groupWidth = 20;
                option.legend = 'none';
                //$scope.googlecharts.colors = ['#66CC00', '#FF0000'];

                var chart = new google.visualization.ColumnChart(document.getElementById('egGraph'));
                var setDataByCity = function () {
                    var selectedItem = chart.getSelection()[0];
                    $scope.selectedEG = undefined;
                    if (selectedItem) {
                        $scope.selectedEG = data.getValue(selectedItem.row, 0);
                        $scope.drawRepairClassGraph();
                        $scope.drawProductWiseGraph();
                    }
                    $scope.$apply();
                };
                google.visualization.events.addListener(chart, 'select', setDataByCity);
                chart.draw(data, option);
            }, 500);
        };
        $scope.drawRepairClassGraph = function () {
            $scope.egRepairClassWiseData = [{
                    "eg": "UW",
                    "year-2015": 89,
                    "year-2016": 91
                }, {
                    "eg": "AW",
                    "year-2015": 54,
                    "year-2016": 79
                }, {
                    "eg": "OW",
                    "year-2015": 85,
                    "year-2016": 92
                }, {
                    "eg": "C1",
                    "year-2015": 81,
                    "year-2016": 79
                }, {
                    "eg": "FOC",
                    "year-2015": 54,
                    "year-2016": 56
                }, {
                    "eg": "Repeat",
                    "year-2015": 89,
                    "year-2016": 91
                }];
            $timeout(function () {
                var gdata = [];
                // gdata[0] = ['Month', '2015', '2016'];
                gdata[0] = ['EG', '2016', {role: "style"}];
                var j = 1;
                for (var i = 0; i < $scope.egRepairClassWiseData.length; i++) {
                    var tp = [];
                    tp.push($scope.egRepairClassWiseData[i].eg);
                    tp.push($scope.egRepairClassWiseData[i]['year-2016']);
                    tp.push($scope.getComplianceColor($scope.egRepairClassWiseData[i]['year-2016']));
                    gdata[j] = tp;
                    j++;
                }
                var data = google.visualization.arrayToDataTable(gdata);
                var option = angular.copy($scope.googlecharts);
                option.width = 300;
                option.height = 300;
                option.bar.groupWidth = 34;
                option.legend = 'none';
                var chart = new google.visualization.ColumnChart(document.getElementById('egRepairClassGraph'));
                chart.draw(data, option);
            }, 500);
        };
        $scope.drawProductWiseGraph = function () {
            $scope.egProductWiseData = [{
                    "eg": "DC",
                    "year-2015": 89,
                    "year-2016": 91
                }, {
                    "eg": "GNF",
                    "year-2015": 54,
                    "year-2016": 79
                }, {
                    "eg": "WASHER",
                    "year-2015": 85,
                    "year-2016": 92
                }, {
                    "eg": "AC",
                    "year-2015": 81,
                    "year-2016": 79
                }, {
                    "eg": "MWO",
                    "year-2015": 54,
                    "year-2016": 56
                }];
            var gdata = [];
            // gdata[0] = ['Month', '2015', '2016'];
            gdata[0] = ['EG', 'Product Wise'];
            var j = 1;
            for (var i = 0; i < $scope.egProductWiseData.length; i++) {
                var tp = [];
                tp.push($scope.egProductWiseData[i].eg);
                tp.push($scope.egProductWiseData[i]['year-2016']);
                gdata[j] = tp;
                j++;
            }
            var data = google.visualization.arrayToDataTable(gdata);
            var option = angular.copy($scope.googlecharts);
            option.width = 300;
            option.height = 300;
            option.is3D = true;
            var chart = new google.visualization.PieChart(document.getElementById('egProductWiseGraph'));
            chart.draw(data, option);
        };
        $scope.getDountConfig = function () {
            return  {
                pieHole: 0.6,
                legend: 'none',
                pieSliceText: 'value',
                titleTextStyle: {
                    color: 'black',
                    fontSize: 16
                },
                pieSliceTextStyle: {
                    color: 'black',
                    fontSize: 20
                }, "chartArea": {
                    "left": "15%",
                    "top": "10%",
                    "width": "80%",
                    "height": "75%"
                }
            };
        }
        $scope.getChartConfig = function () {
            $http.get("data/googlecharts.json").success(function (data) {
                $scope.googlecharts = data;
                $scope.googlecharts.colors = URL_LINKS.colorsarr;
            });
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
        $scope.conditionalIf = function (type, value) {
            if ($scope.configParam[type].length == 0) {
                return true;
            } else if ($scope.configParam[type].length > 0 && $scope.configParam[type].indexOf(value) > -1) {
                return true;
            } else {
                return false
            }
        }
    }]);
