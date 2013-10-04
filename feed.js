/*Feed Module*/
var feedApp = angular.module('feedApp', []);

/* Routes*/
feedApp.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'partials/view1.html',
		controller: 'feedController'
	}).when('/view2/:feedID', {
		templateUrl: 'partials/view1.html',
		controller: 'feedViewController'
	}).otherwise({ redirectTo: '/' });

});



/* Feed Controller*/
feedApp.controller('feedController', function ($scope,$http,feedService,$routeParams) {
	$scope.feeds = [];
	init();

	function init() {
		$scope.feeds = feedService.getFeeds();
	};

	$scope.nextFeed = function(){
		$scope.feeds = feedService.nextFeed();
	};

	$scope.prevFeed = function(){
		$scope.feeds = feedService.prevFeed();
	};
});

/* Feed Controller*/
feedApp.controller('feedViewController', function ($scope,$http,feedService,$routeParams) {
	$scope.feeds = [];
	init();

	function init() {
		var feedID = ($routeParams.feedID) ? parseInt($routeParams.feedID) : 0;
		if(feedID > 0){
			$scope.feeds = feedService.getSpecificFeed(feedID);
/*			var uri = 'content/resources/feed'+feedID+'.json';
			$http({method: 'GET', url: uri}).
			success(function(data) {
				$scope.feeds = data.feed.item;
				console.log($scope.feeds.toString());
				console.log("success "+$scope.feeds[0].heading);
			}).
			error(function(data) {
				console.log("error");
			});*/
		}
	}
});



/* Feed Service*/
feedApp.service('feedService', function ($http) {
	//init();
	var feeds = [];
	var dummyfeeds = [];
	var currentPage = 1;
	var numFeed = 3;
	var maxPages = Math.ceil(feeds.length/numFeed);
	
	/*this.resetFeed = function(){
		currentPage = 1;
		this.feedArray();
	};*/
	this.nextFeed = function(){
		if(currentPage < maxPages){
			currentPage++;
		}
		return this.feedArray();
	};
	this.prevFeed = function(){
		if(currentPage > 1){
			currentPage--;
		}
		return this.feedArray();
	};
	this.feedArray = function(){
		var beg_ind = (currentPage-1)*numFeed;
		var end_ind = beg_ind + numFeed;
		dummyfeeds = feeds.slice(beg_ind,end_ind);
		return dummyfeeds;
	};
	this.displayFeed = function(){
		return feeds;
	};

	this.getSpecificFeed = function(feedID){
		var uri = 'content/resources/feed'+feedID+'.json';
		console.log(uri);
		$http({method: 'GET', url: uri}).
		success(function(data) {
			feeds = data.feed.item;
			console.log("success");
		}).
		error(function(data) {
			console.log("error");
		});
		maxPages = Math.ceil(feeds.length/numFeed);
		currentPage = 1;
		//this.resetFeed();
		//return dummyfeeds;
		return this.feedArray();
	};

	this.getFeeds = function(){
		$http({method: 'GET', url: 'content/resources/feed1.json'}).
			success(function(data) {
				feeds = data.feed.item;
				console.log("default success "+feeds[0].heading);
			}).
		error(function(data) {
			console.log("error");
		});
		maxPages = Math.ceil(feeds.length/numFeed);
		currentPage = 1;
		//this.resetFeed();
		//return dummyfeeds;
		return this.feedArray();
	};

});

