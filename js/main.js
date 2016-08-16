var app = angular.module('tutorialWebApp', [
  'ngRoute'
  
]);


app.directive('tab', function() {
  return {
  restrict: 'E',
  transclude: true,
  template: '<div role="tabpanel" ng-show="active" ng-transclude></div>',
  require: '^tabset',
  scope: {
    heading: '@'
  },
  link: function(scope, elem, attr, tabsetCtrl) {
    scope.active = false
    tabsetCtrl.addTab(scope)
  }
}
})
    .directive('tabset', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: { },
    templateUrl: 'templates/tabset.html',
    bindToController: true,
    controllerAs: 'tabset',
    controller: function() {
      var self = this
      self.tabs = [];
    self.addTab = function addTab(tab) {
  self.tabs.push(tab);
         if(self.tabs.length === 1) {
    tab.active = true
  }
        
}
    self.select = function(selectedTab) {
  angular.forEach(self.tabs, function(tab) {
    if(tab.active && tab !== selectedTab) {
      tab.active = false;
    }
  })

  selectedTab.active = true;
}
    }
  }
})

/**
* Configure the Routes
*/

app.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider)  {
    $locationProvider.html5Mode(true);
  $routeProvider
  // Home
  .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
  //Pages
.when("/partials/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
 .when("/partials/products", {templateUrl: "partials/products.html", controller: "PageCtrl"})
.when("/partials/specials", {templateUrl: "partials/specials.html", controller: "PageCtrl"})
     .when("/partials/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
     .when("/partials/login", {templateUrl: "partials/login.html", controller: "PageCtrl"})
      .when("/partials/cart", {templateUrl: "partials/cart.html", controller: "PageCtrl"})
  .when("/partials/search", {templateUrl: "partials/search.html", controller: "PageCtrl"})
   .when("/partials/thanks", {templateUrl: "thanks/thanks.html", controller: "PageCtrl"})
   .when("/partials/purchase", {templateUrl: "partials/purchase.html", controller: "PageCtrl"})
   .when("/partials/checkout", {templateUrl: "partials/checkout.html", controller: "PageCtrl"})
   .when("/partials/add", {templateUrl: "partials/addmember.html", controller: "PageCtrl"})
  
  
  .when("/partials/members", {templateUrl: "partials/members.html", controller: "PageCtrl"})
  .when("/partials/detail", {templateUrl: "partials/detail.html", controller: "PageCtrl"});
    
    
  


  
  
}])






app.controller('PageCtrl', ['$scope', '$http', function (scope, http ){
        http.get('specials.json').success(function(data) {
          scope.specials = data;
                    
        });
      }]);




