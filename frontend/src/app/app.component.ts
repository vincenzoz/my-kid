import {Component, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  currentNavigationSection = signal<NavigationSection>(NavigationSection.HOME);

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
