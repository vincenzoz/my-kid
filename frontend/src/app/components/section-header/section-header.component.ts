import {Component, inject, input, OnInit, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AppStore} from '../../store/app.store';
import {CurrentSection} from '../../models/enums/current-section.enum';
import {NgClass} from '@angular/common';
import {SchoolStore} from '../../store/school/school.store';

@Component({
  selector: 'section-header',
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.css'
})
export class SectionHeaderComponent implements OnInit {

  protected appStore = inject(AppStore);

  protected schoolStore = inject(SchoolStore);

  protected config: HeaderSectionConfig;

  isSubSection = input<boolean>();

  subSection = input<string>();

  ngOnInit(): void {
    const currentSection = this.appStore.currentSection();
    switch (currentSection) {
      case CurrentSection.SCHOOL:
        this.config = { title: 'Scuola', bgColor: 'bg-school', border: 'border-b-school-dark', text: 'text-school-dark', outline: 'outline-school-dark', icon: '/icons/school.svg'}
        break;
      case CurrentSection.HEALTH:
        this.config = { title: 'Salute', bgColor: 'bg-health', border: 'border-b-health-dark', text: 'text-health-dark', outline: 'outline-health-dark', icon: '/icons/health.svg'}
        break;
      case CurrentSection.DIARY:
        this.config = { title: 'Diario', bgColor: 'bg-diary', border: 'border-b-diary-dark', text: 'text-diary-dark', outline: 'outline-diary-dark', icon: '/icons/diary.svg'}
        break;
      case CurrentSection.SPORT:
        this.config = { title: 'Sport', bgColor: 'bg-sport', border: 'border-b-sport-dark', text: 'text-sport-dark', outline: 'outline-sport-dark', icon: '/icons/sport.svg'}
        break;
    }

  }

  canNavigate() {
    const isLoading = this.schoolStore.schoolCommunications().loading;
    return !isLoading;
  }
}

interface HeaderSectionConfig {
  title: string;
  border: string;
  bgColor: string;
  text: string;
  outline: string;
  icon: string;
}
