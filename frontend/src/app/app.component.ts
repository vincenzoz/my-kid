import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ProgressSpinner} from 'primeng/progressspinner';
import {AppStore} from './store/app.store';
import {SchoolStore} from './store/school/school.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ProgressSpinner],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  currentNavigationSection = signal<NavigationSection>(NavigationSection.HOME);

  protected appStore = inject(AppStore);

  navigateTo(navigationSection: NavigationSection) {
    this.currentNavigationSection.set(navigationSection);
  }

  protected readonly NavigationSection = NavigationSection;
}


export enum NavigationSection {
  HOME,
  SCHOOL,
  CREATE,
  HEALTH,
  PROFILE
}
