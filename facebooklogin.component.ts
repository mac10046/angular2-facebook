import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from "angular2/router";


declare const FB:any;

@Component({
    selector: 'facebook-login',
    templateUrl: 'facebooklogin.html',
    directives: [ROUTER_DIRECTIVES]
})

export class FacebookLoginComponent implements OnInit {

    constructor() {
        FB.init({
            appId      : 'your-app-id',
            cookie     : false,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.7' // use graph api version 2.5
        });
    }

    onFacebookLoginClick() {
        FB.login(this.statusChangeCallback);
    }

    statusChangeCallback(resp) {
        if (resp.status === 'connected') {
            
            console.log(resp.authResponse.accessToken);
            console.log(resp.authResponse.expiresIn);
            console.log(resp.authResponse.signedRequest);
            console.log(resp.authResponse.userID);
            // connect here with your server for facebook login by passing access token given by facebook
            // Another call to facebook to get details of the user
            FB.api('/me?fields=name,email,first_name,last_name,age_range,gender,picture', function (resp:any) {
            console.log(resp.email);
            console.log(resp.name);
            console.log(resp.first_name);
            console.log(resp.last_name);
            console.log(resp.age_range);
            console.log(resp.gender);
            console.log(resp.picture);
                
            }, { scope: 'email,public_profile' });

           
        }else if (resp.status === 'not_authorized') {
            
        }else {
            
        }
    };
    ngOnInit() {
        //you may comment the follwing lines - if you do not want to check the login status on page load
        // comment these lines (example) if you are on Register page of your application
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
    }
}
