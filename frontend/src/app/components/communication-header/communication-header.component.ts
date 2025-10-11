import {Component, inject, input} from '@angular/core';
import {NgIf, Location} from "@angular/common";
import {Skeleton} from "primeng/skeleton";
import {CommunicationStore} from '../../store/communication.store';
import {FormGroup} from '@angular/forms';
import {CreateSchoolCommunication, ModifyCommunication} from '../../models/school-models';
import {Router} from '@angular/router';
import {AppStore} from '../../store/app.store';
import {SectionConfigService} from '../../services/section-config.service';


@Component({
  selector: 'communication-header',
    imports: [
        NgIf,
        Skeleton
    ],
  templateUrl: './communication-header.component.html',
  styleUrl: './communication-header.component.css'
})
export class CommunicationHeaderComponent {

  protected router = inject(Router);
  protected schoolStore = inject(CommunicationStore);
  protected appStore = inject(AppStore);

  mode = input<string>();

  id = input<number>();

  communicationForm = input.required<FormGroup>();

  protected sectionConfig = inject(SectionConfigService);

  constructor(private location: Location) {
  }

  goBack(){
    this.location.back();
  }

  saveOrModify() {
    if (this.mode() === 'create') {
      const createSchoolCommunication: CreateSchoolCommunication = {
        title: this.communicationForm().get('title')!.value,
        description: this.communicationForm().get('description')!.value,
        important: this.communicationForm().get('important')?.value,
        type: this.appStore.currentSection()!,
      }
      this.schoolStore.newCommunication(createSchoolCommunication);

    } else if (this.mode() === 'edit') {
      const modifyCommunication: ModifyCommunication = {
        title: this.communicationForm().get('title')!.value,
        description: this.communicationForm().get('description')!.value,
        important: this.communicationForm().get('important')?.value,
      };
      this.schoolStore.modifyCommunication(this.id()!, modifyCommunication);
    }
    this.goBack();
  }
}
