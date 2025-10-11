import {Component, inject, input } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from '@angular/common';
import {CommunicationStore} from '../../store/communication.store';
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

  protected schoolStore = inject(CommunicationStore);

  protected appStore = inject(AppStore);

  protected sectionConfig = inject(SectionConfigService);

  isSubSection = input<boolean>();

  canNavigate() {
    const isLoading = this.schoolStore.communications().loading;
    return !isLoading;
  }
}
