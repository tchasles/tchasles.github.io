'use strict';
var newsApp = angular.module('newsApp', [,'angular.less']);
/* Controllers */
newsApp.controller('NewsListCtrl', function ($scope, $http) {
    $scope.news = null;
    $scope.news = $http({method: "GET", url: "http://adneom.herokuapp.com/api/posts"}).
        then(function(response) {
            $scope.news = response.data;
            for(var i=0; i< $scope.news.length; i++){
                $http({method: "GET", url: "http://adneom.herokuapp.com/api/posts/"+$scope.news[i]._id}).
                    then(function(response) {
                        $scope.news[i] = response.data;
                    }, function(response) {
                        response.data;
                    });
                ;
            }
        }, function(response) {
            $scope.news = response.data;
        });


    function getIndexNews(id) {
        return $scope.news.map(function(el){
            return el._id;
        }).indexOf(id);
    };

    $scope.addLikeTo = function(id) {
        $http({method: "PUT", url: "http://adneom.herokuapp.com/api/posts/"+id+"/upvote "}).
            then(function(response) {
                $scope.news[getIndexNews(id)] =response.data;
            }, function(response) {
                response.data;
            });
    };
    $scope.addCommentTo = function(id, newComment){
        $http({method: "POST", url: "http://adneom.herokuapp.com/api/posts/"+id+"/comments", data: newComment}).
            then(function(response) {
                $scope.news[getIndexNews(id)].comments.push(response.data);
            }, function(response) {
                response.data;
            });
    }
    $scope.addNews = function(news){
        $http({method: "POST", url: "http://adneom.herokuapp.com/api/posts", data: news}).
            then(function(response) {
                $scope.news.push(response.data);
            }, function(response) {
                response.data;
            });
    }
});

