import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService, PlatformContextNavigationService, LocationService, CountryService } from './_services/index';
import { LoginComponent } from './pages/login/index';
import { SignupComponent } from './pages/signup/index';
import { HomeComponent } from './pages/home/index';

import { AppHeaderComponent } from './widgets/app-header/index';
import { AppDefaultHeaderComponent } from './widgets/app-header-default/index';
import { AppFooterComponent } from './widgets/app-footer/index';
import { AppSidebarComponent } from './widgets/app-sidebar/index';

import {ServiceEndpoints} from './_configuration/index';


let widgets = [
    AppHeaderComponent, AppDefaultHeaderComponent, AppFooterComponent, AppSidebarComponent
];

let components = [
        AppComponent,
        LoginComponent,
        HomeComponent,
        SignupComponent
        ];

let providers = [
    AuthGuard,
    ServiceEndpoints,
    AuthenticationService, 
    UserService,
    PlatformContextNavigationService,
    LocationService,
    CountryService
];

let modules = [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
];

@NgModule({
    imports: [
        ...modules
    ],
    declarations: [
        ...components,
        ...widgets
    ],
    providers: [
        ...providers
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }