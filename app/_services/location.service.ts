import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map'

import { AuthenticationService } from './index';
import { Location } from '../_models/index';

import { ServiceEndpoints } from '../_configuration/index';

@Injectable()
export class LocationService {

    _locations : Location[];
    _limit : number = 10;
    _offset : number = 0;
    
    constructor(
        private http: Http,
        private serviceEndpoints : ServiceEndpoints) {
    }

    getLocations (query:string, locationCountryIso:string) : Observable<Location[]> {

        let serviceEndpoint  = this.serviceEndpoints.locationService;
        
        let getLocations = serviceEndpoint
                    +"?query="+query+"&locationCountryIso="+locationCountryIso
                    +"&limit="+this._limit+"&offset="+this._offset;

        return this.http.get(getLocations)
            .map((response: Response) =>  {
                this._locations = response.json() && response.json().locations;
                if(this._locations)
                    return this._locations;
            });
    }
}