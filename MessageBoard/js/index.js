// index.js
(function () {

  "use strict";

  var app = angular.module("index-page", ['ngRoute']);

  app.config(function ($routeProvider) {

    $routeProvider.when("/", {
      controller: "topicsController",
      controllerAs: "ctrl",
      templateUrl: "/tmpl/topics.html"
    });

    $routeProvider.when("/newTopic", {
      controller: "newTopicController",
      controllerAs: "newTopicCtrl",
      templateUrl: "/tmpl/newTopic.html"
    });

    $routeProvider.otherwise({ redirectTo: "/" });
  });

  app.controller("topicsController", function (dataService) {

    var ctrl = this;

    ctrl.title = "Hello World Topics";
    ctrl.items = dataService.items;

    ctrl.isBusy = true;
    ctrl.errorMessage = "";

    dataService.loadVisits()
      .then(function (result) { // success
        // DO nothing, it'll just load
      }, function (error) { // failure
        ctrl.errorMessage = err;
      })
      .finally(function () {
        ctrl.isBusy = false;
      });

  });

  app.controller("newTopicController", function (dataService, $window) {

    var ctrl = this;

    ctrl.newItem = {};
    ctrl.isBusy = false;
    ctrl.errorMessage = "";

    ctrl.save = function () {

      // Reset temp properties
      ctrl.isBusy = true;
      ctrl.errorMessage = "";

      dataService.addVisit(ctrl.newItem)
        .then(
          function (result) { // success
            // Redirect back.
            window.location = "#/";
          },
          function (error) { // failure
            ctrl.errorMessage = error;
          })
        .finally(function () {
          ctrl.isBusy = false
        });

    };

  });

  app.factory("dataService", function ($http, $q) {

    var _items = [];
    var _itemsLoaded = false;

    var _loadItems = function () {

      var deferred = $q.defer();

      // Test to see if we've loaded the data yet.
      if (!_itemsLoaded) {
        $http.get("/api/topics?includeReplies=true")
         .then(function (result) { // success
           angular.copy(result.data, _items);
           _itemsLoaded = true;
           deferred.resolve();
         }, function () { // failure
           deferred.reject("Bad things happen to good developers.");
         });
      } else {
        // If already loaded, just resolve
        deferred.resolve();
      }

      return deferred.promise;

    };

    var _addVisit = function (newItem) {

      var deferred = $q.defer();

      $http.post("/api/topics", newItem)
      .then(
        function (result) { // success
          _loadItems()
            .then(function () {
              _items.push(result.data);
              deferred.resolve(result.data);
            }, function () {
              deferred.reject("Failed to load items to add to the collection.");
            });
        },
        function () { // failure
          deferred.reject("Failed to update the database.");
        });

      return deferred.promise;

    };

    return {
      items: _items,
      loadVisits: _loadItems,
      addVisit: _addVisit
    };
  });

})();