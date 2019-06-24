app.controller('registerController',function($scope,registerService)
{
  $scope.register= function()
  {
      var data = 
      {
          'firstname': $scope.firstname,
          'lastname': $scope.lastname,
          'email':$scope.email,
          'password':$scope.password
      }
       console.log(data);
       
       registerService.register(data);
  }
});









