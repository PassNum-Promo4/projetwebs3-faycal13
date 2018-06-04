import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AddressComponent } from './address/address.component';

import { AuthguardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [AuthguardService]

  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthguardService]

  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'profile/settings',
    component: SettingsComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'profile/address',
    component: AddressComponent,
    canActivate: [AuthguardService]
  },
  {
    path:"**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
