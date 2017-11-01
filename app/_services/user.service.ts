import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './index';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUser () : Observable<User> {
        let headers_values = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.access_token });
        let options = new RequestOptions({ headers: headers_values });

        // get users from api
        let getUserQuery = 'http://localhost:8080/fringe-usermanagement/api/users?access_token='+this.authenticationService.access_token;

        return this.http.get(getUserQuery, options)
            .map((response: Response) =>  response.json());
    }
}