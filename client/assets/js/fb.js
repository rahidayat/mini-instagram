// This is called with the results from from FB.getLoginStatus().
// function statusChangeCallback(response) {
//   console.log('statusChangeCallback');
//   console.log(response);
//   // The response object is returned with a status field that lets the
//   // app know the current login status of the person.
//   // Full docs on the response object can be found in the documentation
//   // for FB.getLoginStatus().
//   if (response.status === 'connected') {
//     // Logged into your app and Facebook.
//     // testAPI();
//     // let uid = response.authResponse.userID
//     let token = response.authResponse.accessToken
//     // localStorage.setItem('userID', uid);
//     localStorage.setItem('fbtoken', token)
//     // window.location.href="main.html"
//     axios.get(`http://localhost:3000/login`, {
//         headers : {
//           fbtoken : localStorage.getItem('fbtoken')
//         }
//       })
//       .then(response => {
//         console.log('ini data response ', response);
//         // localStorage.setItem('token', response.data.token)
//         window.location.href = "main.html"
//         // if(localStorage.getItem('fbtoken') !== null) {
//         //   window.location.href = "main.html"
//         // }
//         // if(window.location.href !== 'http://localhost:8080/main.html' ) {
//         //   window.location = "main.html"
//         // }
//       })
//       .catch(err => {
//         console.log(err);
//       })
//     // FB.api('/'+uid+'/permissions', 'delete', function(response){
//     //   localStorage.clear()
//     //   console.log('fblogout response ', response);
//     // });
//   } else {
//     // The person is not logged into your app or we are unable to tell.
//     // document.getElementById('status').innerHTML = 'Please log ' +
//     //   'into this app.';
//     localStorage.clear()
//     if(window.location.href == 'http://localhost:8080/main.html' ) {
//       window.location = 'index.html'
//     }
//   }
// }

// // This is called with the results from from FB.getLoginStatus().
//   function statusChangeCallback(response) {
//     console.log('statusChangeCallback');
//     console.log(response);
//     // The response object is returned with a status field that lets the
//     // app know the current login status of the person.
//     // Full docs on the response object can be found in the documentation
//     // for FB.getLoginStatus().
//
//     if (response.status === 'connected') {
//       // Logged into your app and Facebook.
//       testAPI();
//       let uid = response.authResponse.userID
//       let token = response.authResponse.accessToken
//       localStorage.setItem('userID', uid);
//       localStorage.setItem('fbtoken', token)
//       console.log(`masuk response coy`, response)
//       window.location.href="main.html"
//       FB.api('/'+uid+'/permissions', 'delete', function(response){
//         localStorage.removeItem('fbaccesstoken')
//         console.log('fblogout response ', response);
//       });
//     } else {
//       // The person is not logged into your app or we are unable to tell.
//       console.log('tidak login');
//       // window.location.href = 'index.html'
//       // localStorage.clear()
//       // if(window.location.href == 'main.html' ) {
//       //   document.getElementById('status').innerHTML = 'Please log ' +
//       //   'into this app.';
//       // }
//     }
//   }

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      // testAPI()
      localStorage.setItem('fbaccesstoken',response.authResponse.accessToken)
      axios.get(`http://localhost:3000/login`, {
        headers : {
          fbaccesstoken : response.authResponse.accessToken
        }
      })
      .then(response => {
        console.log('ini data response', response);
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('name', response.data.name)
        if(window.location.href !== 'http://localhost:8080/main.html' ) {
          window.location.href = 'main.html'
        }
      })
      .catch(err => {
        console.log(err);
      })

      // window.location.href="main.html"
    } else {
      localStorage.clear()
      document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';

    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
FB.init({
  appId      : '1448311661921985',
  cookie     : true,  // enable cookies to allow the server to access
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.10' // use graph api version 2.8
});


FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', {fields: ['id','name','email']}, function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}
