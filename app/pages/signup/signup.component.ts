import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegisterPartner, Country, Location } from '../../_models/index';

import { CountryService, LocationService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'signup.component.html'
})

export class SignupComponent implements OnInit {

    registerPartnerForm: FormGroup;
    addressForm: FormGroup;
    _countries: Country[] = [];
    _locations: Location[] = [];
    _selectedLocationCountryIso: string = '';
    _showZipCodeSuggestions = true;

    constructor(private formBuilder: FormBuilder,
        private locationService: LocationService,
        private countryService: CountryService) { }

    ngOnInit() {
        this.registerPartnerForm = this.formBuilder.group({
            firstName: [null, [Validators.required, Validators.minLength(2)]],
            lastName: [null, [Validators.required, Validators.minLength(2)]],
            companyName: null,
            email: [null, [Validators.required, Validators.minLength(2), Validators.pattern('\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b')]],
            contactNumber: this.formBuilder.group({
                mobileNumberCountryIso: null,
                mobileNumber: null
            }),
            address: this.formBuilder.group({
                addressLine1: [null, [Validators.required, Validators.minLength(2)]],
                addressLine2: null,
                locationId:null,
                zipcode: [{value: null, disabled: true}],
                locationName: [{value: null, disabled: true}],
                city: [{value: null, disabled: true}],
                region: [{value: null, disabled: true}],
                locationCountryIso: [{value: null, disabled: true}]
            })
        });

        this.registerPartnerForm.get("contactNumber").get("mobileNumber").disable();
        this.registerPartnerForm.get("address").get("locationCountryIso").enable();

        this.countryService.getCountries()
            .subscribe(_countries => {
                this._countries = _countries;
            });
    }

    onZipCodeKeyUp(event: any) {
        if (event.target.value != null && event.target.value.length >= 3) {
            this._showZipCodeSuggestions = true;
            this.locationService.getLocations(event.target.value, this._selectedLocationCountryIso)
                .subscribe(_locations => {
                    this._locations = _locations;
                });
        } else {
            this._showZipCodeSuggestions = false;
            this.registerPartnerForm.get("address").get("locationId").setValue(null);
            this.registerPartnerForm.get("address").get("locationName").setValue(null);
            this.registerPartnerForm.get("address").get("city").setValue(null);
            this.registerPartnerForm.get("address").get("region").setValue(null);
        }
    }

    onMobileNumberCountryIsoChange(event: any) {
        if (event.target.value != null && event.target.value != '') {
            this.registerPartnerForm.get("contactNumber").get("mobileNumber").enable();
            console.log("enabled");
        }
        console.log(event.target.value);
    }

    onLocationCountryIsoChange(event: any) {
        this._selectedLocationCountryIso = event.target.value;
        if (event.target.value != null && event.target.value != '') {
            this.registerPartnerForm.get("address").get("zipcode").enable();
            console.log("enabled");
        }
        console.log(event.target.value);
    }

    onLocationClicked(location: Location) {
        this._showZipCodeSuggestions = false;
        if (location != null) {
            this.registerPartnerForm.get("address").get("locationId").setValue(location.locationId);
            this.registerPartnerForm.get("address").get("zipcode").setValue(location.zipcode);
            this.registerPartnerForm.get("address").get("locationName").setValue(location.locationName);
            this.registerPartnerForm.get("address").get("city").setValue(location.city);
            this.registerPartnerForm.get("address").get("region").setValue(location.region);
        } else {
            this.registerPartnerForm.get("address").get("locationId").setValue(location.locationId);
            this.registerPartnerForm.get("address").get("locationName").setValue(null);
            this.registerPartnerForm.get("address").get("city").setValue(null);
            this.registerPartnerForm.get("address").get("region").setValue(null);
        }
        console.log(location.locationName);
    }

     onSubmit({ value, valid }: { value: RegisterPartner, valid: boolean }) {
        console.log(JSON.stringify(value));
    }
}
