import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {SchoolComponent} from './pages/school/school.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {HealthComponent} from './pages/health/health.component';
import {CreateComponent} from './pages/create/create.component';
import {CommunicationComponent} from './components/communication/communication.component';
import {
  CommunicationListComponent
} from './components/communication-list/communication-list.component';
import { DiaryComponent } from './pages/diary/diary.component';
import { SportComponent } from './pages/sport/sport.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'school', component: SchoolComponent,
    // children: [
    //   {
    //     path: 'communications', component: SchoolCommunicationListComponent,
    //   }
    // ]
  },

  { path: 'school/communications', component: CommunicationListComponent},
  { path: 'school/communications/create', component: CommunicationComponent, data: {mode: 'create'}},
  { path: 'school/communications/:id/edit', component: CommunicationComponent, data: {mode: 'edit'}},
  { path: 'school/communications/:id/view', component: CommunicationComponent, data: {mode: 'view'}},


  { path: 'diary', component: DiaryComponent},
  { path: 'diary/communications', component: CommunicationListComponent},
  { path: 'diary/communications/create', component: CommunicationComponent, data: {mode: 'create'}},
  { path: 'diary/communications/:id/edit', component: CommunicationComponent, data: {mode: 'edit'}},
  { path: 'diary/communications/:id/view', component: CommunicationComponent, data: {mode: 'view'}},


  { path: 'health', component: HealthComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'sport', component: SportComponent},
  {
    path: 'create',
    children: [
      { path: '', component: CreateComponent },
      { path: 'school-communication', component: CommunicationComponent }
    ],
  },
];
