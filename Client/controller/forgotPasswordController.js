app.controller('forgotPasswordController', function ($scope, forgotPasswordService) 
{

    $scope.forgotPassword = function () 
    {
        var data = 
        {
            'email': $scope.email,
        }
        forgotPasswordService.forgotPassword(data, $scope);
    }
});
