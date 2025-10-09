import {Component, inject, input } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from '@angular/common';
import {SchoolStore} from '../../store/school/school.store';
import {SectionConfigService} from '../../services/section-config.service';
import {AppStore} from '../../store/app.store';

@Component({
  selector: 'section-header',
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.css'
})
export class SectionHeaderComponent {

  protected schoolStore = inject(SchoolStore);

  protected appStore = inject(AppStore);

  protected sectionConfig = inject(SectionConfigService);

  isSubSection = input<boolean>();

  canNavigate() {
    const isLoading = this.schoolStore.schoolCommunications().loading;
    return !isLoading;
  }
}
