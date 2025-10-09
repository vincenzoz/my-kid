import {Component, inject} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {Section} from '../../models/enums/current-section.enum';
import {AppStore} from '../../store/app.store';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'home',
  imports: [
    InputText,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  protected appStore = inject(AppStore);

  protected readonly CurrentSection = Section;

  navigateToSection(section: Section) {
    this.appStore.setCurrentSection(section)
  }

}

