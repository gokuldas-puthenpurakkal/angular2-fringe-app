import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map'

import { AuthenticationService } from './index';
import { Country } from '../_models/index';

import { ServiceEndpoints } from '../_configuration/index';

@Injectable()
export class CountryService {

    _countries : Country[];
    _limit : number = 10;
    _offset : number = 0;
    
    constructor(
        private http: Http,
        private serviceEndpoints : ServiceEndpoints) {
    }

    getCountries () : Observable<Country[]> {

        let serviceEndpoint  = this.serviceEndpoints.countryService;

        let getCountries = serviceEndpoint;

        return this.http.get(getCountries)
            .map((response: Response) =>  {
                this._countries = response.json() && response.json().countries;
                if(this._countries)
                    return this._countries;
            });
    }
}