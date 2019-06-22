app.controller('resetPasswordController', function ($scope, resetPasswordService) 
{

    // for registration form
    $scope.resetPassword = function () 
    {
        var user = 
        {
            'password': $scope.password
        }

        console.log("register calling", user);
        if ($scope.password != $scope.password) 
        {
            $scope.message = "password not match ";
        } 
        else 
        {
            resetPasswordService.registerUser(user, $scope);
        }
    }
});