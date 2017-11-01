import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './index';
import { PlatformNavigation } from '../_models/index';

@Injectable()
export class PlatformContextNavigationService {

    _platformNavigations : PlatformNavigation[];

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getContextNavigation () : Observable<PlatformNavigation[]> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.access_token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        let getPlatformContextNavigationQuery = ' http://localhost:8080/fringe-usermanagement/api/users/navigations/contexts?access_token='+this.authenticationService.access_token;

        return this.http.get(getPlatformContextNavigationQuery, options)
            .map((response: Response) =>  {
                let _platformNavigations = response.json() && response.json().navigations;
                if(_platformNavigations)
                    return _platformNavigations;
            });
    }
}