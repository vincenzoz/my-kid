import {Component, inject} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {DatePicker} from 'primeng/datepicker';
import {Textarea} from 'primeng/textarea';
import {Checkbox} from 'primeng/checkbox';
import {CreateSchoolCommunication} from '../../../models/school-models';
import {Router, RouterLink} from '@angular/router';
import {SchoolService} from '../../../services/school.service';

@Component({
  selector: 'school-communication',
  imports: [
    InputText,
    FormsModule,
    DatePicker,
    Textarea,
    Checkbox,
    RouterLink
  ],
  templateUrl: './school-communication.component.html',
  styleUrl: './school-communication.component.css'
})
export class SchoolCommunicationComponent {

  title: string = '';
  description: string = '';
  eventDate: Date | undefined;
  isEvent: boolean = false;
  eventTitle: string = '';

  private schoolService: SchoolService = inject(SchoolService);
  private router: Router = inject(Router);

  save() {
    const createSchoolCommunication: CreateSchoolCommunication = {
      title: this.title,
      description: this.description,
      event: this.isEvent
    }
    if(this.isEvent) {
      createSchoolCommunication.eventTitle = this.eventTitle;
      if (this.eventDate) {
        const year = this.eventDate.getFullYear();
        const month = String(this.eventDate.getMonth() + 1).padStart(2, '0');
        const day = String(this.eventDate.getDate()).padStart(2, '0');
        createSchoolCommunication.eventDate = `${year}-${month}-${day}`;
      }
    }

    console.table(createSchoolCommunication);
    this.schoolService.createSchoolCommunication(createSchoolCommunication)
      .subscribe(value => {
        // TODO handle error
        console.log('OK');
        this.router.navigate(['/school/communications']);
      });

  }
}
