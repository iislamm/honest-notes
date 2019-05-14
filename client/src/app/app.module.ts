import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import * as firebase from 'firebase/app';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ValidationService } from './services/validation.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';

import { RoutingModule } from './routing/routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MessagesComponent } from './messages/messages.component';
import { SearchComponent } from './search/search.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule, MatGridListModule, MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { environment } from 'src/environments/environment';

export function apiUrl() {
  return "https://honest-notes.herokuapp.com/";
  // return "http://localhost:3000/";
}

export function clientUrl() {
  return "https://honest-notes.herokuapp.com/";
}

export function tokenGetter() {
  return localStorage.getItem('token');
}

const firebaseConfig = {
  apiKey: environment.apiKey,
  authDomain: environment.authDomain,
  databaseURL: environment.databaseURL,
  projectId: environment.projectId,
  storageBucket: "honest-notes.appspot.com",
  messagingSenderId: environment.messagingSenderId,
  appId: environment.appId
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    MessagesComponent,
    SearchComponent,
    UserDetailsComponent,
    FeedbackComponent,
    ProfileComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    RoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['localhost:4200/auth/']
      }
    }),
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [AuthService, ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
