var app = angular.module('myApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templet/login.html',
        controller: 'loginController'

    })

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'templet/register.html',
        controller: 'registerController'
    })

    $stateProvider.state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'templet/forgotPassword.html',
        controller: 'forgotPasswordController'
    })
   

    $urlRouterProvider.otherwise('login');
});

  