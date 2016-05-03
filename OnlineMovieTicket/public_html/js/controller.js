OnlineMovieTicketApp.controller("movieStubController", ['$scope', 'APP_CONST', '$routeParams', '$http', '$location', function ($scope, APP_CONST, $routeParams, $http, $location) {
        $scope.tab = $routeParams.viewmode;
        $scope.changeTab = function (tab) {
            if (tab != $scope.tab) {
                $location.path("/index/" + tab);
            }
        }
        $scope.getData = function () {
            if ($scope.tab == "movies") {
                $http.get(APP_CONST.path + "/data/movies.json").success(function (data) {
                    $scope.movies = data.BookMyShow.Event;
                });
            } else {
                $http.get(APP_CONST.path + "/data/venues.json").success(function (data) {
                    $scope.cinemas = data.BookMyShow.Venues;
                });
            }
        };
        $scope.setFavourites = function (cinema) {
            if ($scope.FavCinemas.indexOf(cinema.VenueCode) >= 0) {
                $scope.FavCinemas.splice($scope.FavCinemas.indexOf(cinema.VenueCode), 1);
            } else {
                $scope.FavCinemas.push(cinema.VenueCode);
            }
            $scope.addToSessionStorage('FavCinemas', $scope.FavCinemas);
        };
        $scope.getClass = function (cinema) {
            if ($scope.FavCinemas.indexOf(cinema.VenueCode) >= 0) {
                return false;
            } else {
                return true;
            }
        }
        $scope.setMovie = function (movie) {
            $scope.addToSessionStorage("SelectedMovie", movie);
            var SelectedCinema = $scope.getDataFromSessionStorage("SelectedCinema");
            if (SelectedCinema != null) {
                $location.path("/date");
            } else {
                $location.path("/index/cinemas");
            }
        }
        $scope.setCinemas = function (cinema) {
            $scope.addToSessionStorage("SelectedCinema", cinema);
            var SelectedMovie = $scope.getDataFromSessionStorage("SelectedMovie");
            if (SelectedMovie != null) {
                $location.path("/date");
            } else {
                $location.path("/index/movies");
            }
        }
        $scope.init = function () {
            if ($scope.tab == "cinemas") {
                $scope.FavCinemas = $scope.getDataFromSessionStorage('FavCinemas');
                if ($scope.FavCinemas == null) {
                    $scope.FavCinemas = [];
                }
            }
            $scope.getData();
        };
        $scope.init();
    }]);
OnlineMovieTicketApp.controller("movieDateTimeDetailsController", ['$scope', '$location', 'APP_CONST', '$http', function ($scope, $location, APP_CONST, $http) {
        $scope.selectDate = function (seldate) {
            $scope.addToSessionStorage("SelectedDate", seldate);
            $location.path("/seats");
        };
        // note: we can do it from event-dates.json is.. just because it will see live dates based on current date
        // $http.get(APP_CONST.path + "/data/event-dates.json").success(function (data) {
        //            $scope.AvilableDates = data.dates;
        //        });
//we need 10 date only.
        $scope.AvilableDates = [];
        var k = 10;
        var d = new Date();
        var n = d.getTime();
        $scope.AvilableDates.push(n);
        for (var i = 1; i < k; i++) {
            var newdate = n + (86400000 * i);
            $scope.AvilableDates.push(newdate);
        }
    }]);
OnlineMovieTicketApp.controller("movieSelectSeatsController", ['$scope', '$location', 'APP_CONST', '$http', function ($scope, $location, APP_CONST, $http) {
        var SelectedMovie = $scope.getDataFromSessionStorage('SelectedMovie');
        var SelectedCinema = $scope.getDataFromSessionStorage('SelectedCinema');
        var actSelected = 0;
        $scope.init = function () {
            var SelectedDate = $scope.getDataFromSessionStorage('SelectedDate');
            $scope.SelectedCategory = "Select category of seats";
            $scope.SelectedSeats = "Select seats";
            $scope.selectseattime = true;//we need to select time
            $scope.isselected = false;
            $scope.actselected = false;
            $scope.SelectCategory = [{"category": "GOLD", "price": 400}, {"category": "PRIME", "price": 300}, {"category": "NORMAL", "price": 220}];
            if (SelectedMovie == null || SelectedCinema == null) {
                $location.path("/index/cinemas");
            } else {
                $scope.SelectedMovie = SelectedMovie.EventTitle;
                $scope.SelectedCinema = SelectedCinema.VenuName;
                $scope.SelectedDate = SelectedDate;
                $http.get(APP_CONST.path + "/data/pvr-seats.json").success(function (data) {
                    $scope.seats = data.seats;
                });
            }
        };
        $scope.init();
        $scope.getTotal = function () {
            var ticketval = 0;
            for (var i = 0; i < $scope.SelectCategory.length; i++) {
                if ($scope.SelectCategory[i].category == $scope.SelectedCategory) {
                    ticketval = $scope.SelectCategory[i].price;
                    break;
                }
            }
            return ticketval * Number($scope.SelectedSeats);
        };
        $scope.changeSelected = function () {
            if ($scope.SelectedCategory != "Select category of seats" && $scope.SelectedSeats != "Select seats") {
                $scope.isselected = true;
            }
        };
        $scope.setSeatSelected = function (seat) {
            var id = seat.category + '_' + seat.row + '_' + Number(seat.code);
            var seatid = id.toLowerCase();
            var cl = $("#" + seatid).attr("class");
            if (Number($scope.SelectedSeats) != actSelected || cl.indexOf("btn-success") >= 0) {
                if (cl.indexOf("btn-default") >= 0) {
                    $("#" + seatid).removeClass('btn-default');
                    $("#" + seatid).addClass('btn-success');
                    actSelected++;
                } else {
                    $("#" + seatid).removeClass('btn-success');
                    $("#" + seatid).addClass('btn-default');
                    actSelected--;
                }
            }
            if (Number($scope.SelectedSeats) != actSelected) {
                $scope.actselected = false;
            } else {
                $scope.actselected = true;
            }
        };
        $scope.showAvailableSeats = function () {
            var temp = [];
            for (var i = 0; i < $scope.seats.length; i++) {
                if ($scope.seats[i].category != $scope.SelectedCategory) {
                    $scope.seats[i].isAvailable = false;
                } else {// note : in below else condition we can get data form avilable seat from database & set to unavilable if any seat is already booked..
                    $scope.seats[i].isAvailable = true;
                }
                temp.push($scope.seats[i]);
            }
            $scope.seats = temp;
            $scope.selectseattime = false;//we need to show them avilable seats
        };
        $scope.checkout = function () {
            alert("Your tickit Is confirmed!");
            sessionStorage.clear();
            $location.path("/index/cinemas");
        };

    }]);