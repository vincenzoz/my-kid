import {Component, inject, signal} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {ProgressSpinner} from 'primeng/progressspinner';
import {AppStore} from './store/app.store';
import {filter} from 'rxjs';
import {Section} from './models/enums/current-section.enum';

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

function resolveSection(url: string): Section | undefined{
  if (url.startsWith('/school')) return Section.SCHOOL;
  if (url.startsWith('/health')) return Section.HEALTH;
  if (url.startsWith('/diary')) return Section.DIARY;
  if (url.startsWith('/sport')) return Section.SPORT;
  return undefined;
}


export enum NavigationSection {
  HOME,
  SCHOOL,
  CREATE,
  HEALTH,
  PROFILE
}
