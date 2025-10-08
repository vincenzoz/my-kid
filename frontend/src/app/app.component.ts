import {Component, inject, signal} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {ProgressSpinner} from 'primeng/progressspinner';
import {AppStore} from './store/app.store';
import {filter} from 'rxjs';
import {CurrentSection} from './models/enums/current-section.enum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ProgressSpinner],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor() {
    console.log('AppComponent');
    initRouterWatcher();
  }

  currentNavigationSection = signal<NavigationSection>(NavigationSection.HOME);

  protected appStore = inject(AppStore);

  navigateTo(navigationSection: NavigationSection) {
    this.currentNavigationSection.set(navigationSection);
  }

  protected readonly NavigationSection = NavigationSection;
}

export function initRouterWatcher() {
  const router = inject(Router);
  const appStore = inject(AppStore);
  router.events
    .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
    .subscribe(({ urlAfterRedirects }) =>
      appStore.setCurrentSection(resolveSection(urlAfterRedirects))
    );
}

function resolveSection(url: string): CurrentSection {
  if (url.startsWith('/school')) return CurrentSection.SCHOOL;
  if (url.startsWith('/health')) return CurrentSection.HEALTH;
  if (url.startsWith('/diary')) return CurrentSection.DIARY;
  if (url.startsWith('/sport')) return CurrentSection.SPORT;
  return CurrentSection.NONE;
}


export enum NavigationSection {
  HOME,
  SCHOOL,
  CREATE,
  HEALTH,
  PROFILE
}
