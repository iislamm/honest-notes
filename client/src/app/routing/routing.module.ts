import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MessagesComponent } from '../messages/messages.component';
import { SearchComponent } from '../search/search.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { AuthGuard } from '../auth.guard';
import { FeedbackComponent } from '../feedback/feedback.component';
import { ProfileComponent } from '../profile/profile.component';
import { SettingsComponent } from '../settings/settings.component';
import { CardsComponent } from '../cards/cards.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] }, 
  { path: 'search/:username', component: SearchComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'cards', component: CardsComponent },
  { path: ':id', component: UserDetailsComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class RoutingModule { }
