import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/index';
import { SignupComponent } from './pages/signup/index';
import { HomeComponent } from './pages/home/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);