app.service('registerService', function ($http, $location) 
{
    this.register = function (data, $scope) 
    {
        console.log("data on service register--- ", data);
        
        $http({
            method: 'POST',
            url: 'http://localhost:3000/register',
            data: data,

        }).then(function successCallback(response) 
            {
                console.log("Login successfully at serviceLogin in client side");
                
                 var firstname = response.data.firstname;
                 var lastname = response.data.lastname;
                 var email = response.data.email;
                 var password = response.data.password;
                 
                 localStorage.setItem("firstname", firstname);
                 localStorage.setItem("lastname", lastname);
                 localStorage.setItem("email",email);
                 localStorage.setItem("password",password);
            
                    $location.path('/register');
            },
            
            function errorCallback(response) 
            {
            console.log("register Unsuccessfully ");
            console.log(response);
         
            }
        );
    }
});



/*
app.service('registerService', function ($http, $location) 
{
    this.login = function (data, $scope) 
    {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: data,
        }).then(
           
            function successCallback(response) 
            {
                console.log("Login successfully at serviceLogin in client side");
                 var userid = response.data.message[0]._id;
                 var name = response.data.message[0].firstname;
                 var token = response.data.token;
                 localStorage.setItem("userid", userid);
                 localStorage.setItem("name", name);
                 localStorage.setItem("token",token);
            
                    $location.path('/login');
            },
           
            function errorCallback(response) 
            {
                 console.log("register Unsuccessfully please check your username or password");
                console.log(response);
                //$scope.loginMessage = 'EmailId or Password Incorrect ';
            }
        );
    }

});

*/




