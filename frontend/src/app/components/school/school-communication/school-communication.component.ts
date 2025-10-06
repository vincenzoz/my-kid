import {Component, effect, inject, OnInit} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DatePicker} from 'primeng/datepicker';
import {Textarea} from 'primeng/textarea';
import {Checkbox} from 'primeng/checkbox';
import {CreateSchoolCommunication, ModifyCommunication} from '../../../models/school-models';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, JsonPipe, Location, NgIf} from '@angular/common';
import {SchoolStore} from '../../../store/school/school.store';
import {Skeleton} from 'primeng/skeleton';
import {Chip} from 'primeng/chip';

@Component({
  selector: 'school-communication',
  imports: [
    InputText,
    FormsModule,
    DatePicker,
    Textarea,
    ReactiveFormsModule,
    NgIf,
    DatePipe,
    Skeleton,
    Chip,
    JsonPipe,
  ],
  templateUrl: './school-communication.component.html',
  styleUrl: './school-communication.component.css'
})
export class SchoolCommunicationComponent implements OnInit {

  protected communicationForm: FormGroup;

  protected schoolStore = inject(SchoolStore);

  protected mode: 'create' | 'edit' | 'view' = 'create';

  private communicationId?: number;

  constructor(private fg: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.mode = this.route.snapshot.data['mode'];
    this.communicationId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("mode: " + this.mode);
    console.log("communicationId: " + this.communicationId);
    if (this.communicationId && (this.mode === 'edit' || this.mode === 'view')) {
      // current communication non set
      // current communication set but id on route different thn current id
      if (!this.schoolStore.currentCommunication() || this.schoolStore.currentCommunication().data?.id !== this.communicationId) {
        this.schoolStore.loadCommunication(this.communicationId);
      }
    }
    if (this.mode === 'create') {
      this.schoolStore.initCurrentCommunication();
    }

    effect(() => {
      const { data, loading } = this.schoolStore.currentCommunication();
      if(loading) {
        this.communicationForm.disable();
      } else if(data) {
        this.communicationForm.patchValue(data);
        this.communicationForm.enable();
      }
    });
  }

  ngOnInit(): void {
    this.communicationForm = this.fg.group({
      title: new FormControl<string>('', Validators.required),
      description: new FormControl<string>('', Validators.required),
      important: new FormControl<boolean>(false),
      eventDate: new FormControl<Date | null> (null),
      isEvent: new FormControl<boolean>(false),
      eventTitle: new FormControl<string>('')
    });
  }

  goBack(){
    this.location.back();
  }

  private router: Router = inject(Router);

  setImportant() {
    const important = this.communicationForm.get('important')?.value;
    this.communicationForm.get('important')?.setValue(!important);
  }
  saveOrModify() {
    if (this.mode === 'create') {
      const isEvent = this.communicationForm.get('isEvent')!.value;
      const createSchoolCommunication: CreateSchoolCommunication = {
        title: this.communicationForm.get('title')!.value,
        description: this.communicationForm.get('description')!.value,
        important: this.communicationForm.get('important')?.value,
        event: isEvent,
      }
      if (isEvent) {
        createSchoolCommunication.eventTitle = this.communicationForm.get('eventTitle')?.value;
        const eventDate: Date = this.communicationForm.get('eventDate')?.value;
        if (eventDate) {
          const year = eventDate.getFullYear();
          const month = String(eventDate.getMonth() + 1).padStart(2, '0');
          const day = String(eventDate.getDate()).padStart(2, '0');
          createSchoolCommunication.eventDate = `${year}-${month}-${day}`;
        }
      }
      this.schoolStore.newCommunication(createSchoolCommunication);

    } else if (this.mode === 'edit') {
      const modifyCommunication: ModifyCommunication = {
        title: this.communicationForm.get('title')!.value,
        description: this.communicationForm.get('description')!.value,
        important: this.communicationForm.get('important')?.value,
      };
      this.schoolStore.modifyCommunication(this.communicationId!, modifyCommunication);
    }
    this.router.navigate(['/school/communications']);
  }
}
