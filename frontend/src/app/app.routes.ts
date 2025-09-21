import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {SchoolComponent} from './pages/school/school.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {HealthComponent} from './pages/health/health.component';
import {CreateComponent} from './pages/create/create.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {path: 'school', component: SchoolComponent},
  {path: 'health', component: HealthComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'create', component: CreateComponent}
];
