export class ServiceEndpoints {

    _host : string = "http://localhost:8080";
    
    _providerManagement : string = this._host+"/fringe-providermanagement";
    _serviceManagement : string = this._host+"/fringe-servicemanagement";

    authenticateService : string = this._providerManagement+"/oauth/token";
    userService : string = this._providerManagement+"/api/users";
    platformNavigationService : string = this._providerManagement+"/api/users/navigations";
    registerPartnerService : string = this._providerManagement+"/api/requests/partners";

    locationService : string = this._serviceManagement+"/api/locations";
    countryService : string = this._serviceManagement+"/api/countries";
    
}