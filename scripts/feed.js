/**
* Feed Module
*/
var feedApp = angular.module('feedApp', []);

/* Routes*/
feedApp.config(function ($routeProvider) {
	$routeProvider
		.when('/feed1', 
			{
				template: 'Feed/partials/view1.html',
				controller: 'feedController'
			})
		.otherwise({ redirectTo: '/feed1' });

	
});

/* Feed Controller*/

feedApp.controller('feedController', function ($scope,feedService) {
	
	init();

	function init() {
		$scope.feeds = feedService.getFeeds();
	}



});

/* Feed Service*/
feedApp.service('feedService', function () {
	
	this.getFeeds = function(){
		return feeds;
	};

	var feeds = [
      {
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla tempus varius. Nulla facilisi. In nisi leo, commodo id vestibulum non, mollis quis justo. Nunc elementum feugiat gravida. Praesent condimentum nisi id sapien placerat sed posuere velit fringilla. Curabitur ac purus odio.",
        "image": "image.jpg",
        "heading": "Feed1 Heading 1"
      },
      {
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla tempus varius. Nulla facilisi. In nisi leo, commodo id vestibulum non, mollis quis justo. Nunc elementum feugiat gravida. Praesent condimentum nisi id sapien placerat sed posuere velit fringilla. Curabitur ac purus odio.",
        "image": "image.jpg",
        "heading": "Feed1 Heading 2"
      },
      {
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla tempus varius. Nulla facilisi. In nisi leo, commodo id vestibulum non, mollis quis justo. Nunc elementum feugiat gravida. Praesent condimentum nisi id sapien placerat sed posuere velit fringilla. Curabitur ac purus odio.",
        "image": "image.jpg",
        "heading": "Feed1 Heading 3"
      }];


});

/*
		.when('/feed2',
		 	{
			 	template: '',
			 	controller: 
		 	})
		.when('/feed3', 
			{
				 template: '',
				 controller: 
			})
		.when('/feed4',
			 {
			 	template: '',
			 	 controller: 
		 	})
*/


