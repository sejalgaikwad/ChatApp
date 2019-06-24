
app.controller('loginController',function($scope,loginService)
{
  $scope.login= function()
  {
      var data = 
      {
          'email':$scope.email,
          'password':$scope.password
      }
       console.log(data);
       
       loginService.login(data);
  }
});







