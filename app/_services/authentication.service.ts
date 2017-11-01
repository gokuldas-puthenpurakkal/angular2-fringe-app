import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
    public access_token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.access_token = currentUser && currentUser.access_token;
    }

    login(username: string, password: string): Observable<boolean> {
        let clientId = 'PROVIDER_WEB';
        let loginUrl = 'http://localhost:8080/fringe-usermanagement/oauth/token?grant_type=password&client_id={clientId}&client_secret=12345&username={username}&password={password}';
        loginUrl = loginUrl.replace('{username}', username).replace('{password}', password).replace('{clientId}',clientId);
        // let headers = new Headers({ 'Access-Control-Allow-Origin': 'localhost:8080'});
        // let options = new RequestOptions({ headers: headers });

        return this.http.get(loginUrl)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let access_token = response.json() && response.json().access_token;
                console.log(access_token);
                if (access_token) {
                    // set token property
                    this.access_token = access_token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, access_token: access_token }));

                  // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }


    logout(): void {
        // clear token remove user from local storage to log user out
        this.access_token = null;
        localStorage.removeItem('currentUser');
    }
}