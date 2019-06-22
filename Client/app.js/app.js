var app = angular.module('myApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templet/login.html',
        controller: 'loginController'

    })

    $stateProvider.state('forgetPassword', {
        url: '/forgotPassword',
        templateUrl: 'templet/forgetPassword.html',
        controller: 'forgotPasswordController'

    })

    $stateProvider.state('resetPassword', {
        url: '/resetPassword',
        templateUrl: 'templet/resetPassword.html',
        controller: 'resetPasswordController'

    })

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'templet/register.html',
        controller: 'registerController'
    })

   

    $urlRouterProvider.otherwise('login');
});

  