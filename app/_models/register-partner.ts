export class RegisterPartner {
    registrationId : number;
    firstName : string;
    lastName : string;
    companyName : string;
    email : string;
    contactNumber : {
        mobileNumberCountryIso:string;
        dialCode : string;
        mobileNumber : string;
    };
    address : {
        addressLine1 : string;
        addressLine2 : string;
        locationId : string;
        zipcode : string;
        locationName : string;
        city : string;
        region : string;
        locationCountryIso : string;
        country : string;
        serviceAvailability : string;
    }
}