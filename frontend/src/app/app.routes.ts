import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {SchoolComponent} from './pages/school/school.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {HealthComponent} from './pages/health/health.component';
import {CreateComponent} from './pages/create/create.component';
import {SchoolCommunicationComponent} from './components/school/school-communication/school-communication.component';
import {
  SchoolCommunicationListComponent
} from './components/school/school-communication-list/school-communication-list.component';
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

  { path: 'school/communications', component: SchoolCommunicationListComponent},
  { path: 'school/communications/create', component: SchoolCommunicationComponent, data: {mode: 'create'}},
  { path: 'school/communications/:id/edit', component: SchoolCommunicationComponent, data: {mode: 'edit'}},
  { path: 'school/communications/:id/view', component: SchoolCommunicationComponent, data: {mode: 'view'}},
  { path: 'health', component: HealthComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'diary', component: DiaryComponent},
  { path: 'sport', component: SportComponent},
  {
    path: 'create',
    children: [
      { path: '', component: CreateComponent },
      { path: 'school-communication', component: SchoolCommunicationComponent }
    ],
  },
];
