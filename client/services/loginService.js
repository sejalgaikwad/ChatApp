
app.service('loginService', function ($http, $location) 
{
    this.login = function (data, $scope) 
    {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: data,
        })
        .then(function successCallback(response) 
            {
                console.log("Login successfully at serviceLogin in client side");
                 var userid = response.data._id;
                 var name = response.data.firstname;
                 var token = response.data.token;
                 localStorage.setItem("userid", userid);
                 localStorage.setItem("name", name);
                 localStorage.setItem("token",token);
            
                    $location.path('/login');
            },
           
            function errorCallback(response) 
            {
                 console.log("login Unsuccessfully please check your username or password");
                console.log(response);
          
            }
        );
    }

});






