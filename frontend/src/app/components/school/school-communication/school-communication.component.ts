import {Component, effect, inject, OnInit} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Textarea} from 'primeng/textarea';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {SchoolStore} from '../../../store/school/school.store';
import {Skeleton} from 'primeng/skeleton';
import {Chip} from 'primeng/chip';
import {CommunicationHeaderComponent} from '../../communication-header/communication-header.component';
import {SectionConfigService} from '../../../services/section-config.service';

@Component({
  selector: 'school-communication',
  imports: [
    InputText,
    FormsModule,
    Textarea,
    ReactiveFormsModule,
    DatePipe,
    Skeleton,
    Chip,
    CommunicationHeaderComponent
  ],
  templateUrl: './school-communication.component.html',
  styleUrl: './school-communication.component.css'
})
export class SchoolCommunicationComponent implements OnInit {

  private fg: FormBuilder = inject(FormBuilder);

  private route: ActivatedRoute = inject(ActivatedRoute);

  protected communicationForm: FormGroup;

  protected schoolStore = inject(SchoolStore);

  protected sectionConfig = inject(SectionConfigService);

  protected mode: 'create' | 'edit' | 'view' = 'create';

  protected communicationId?: number;

  constructor() {
    this.mode = this.route.snapshot.data['mode'];
    this.communicationId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("mode: " + this.mode);
    console.log("communicationId: " + this.communicationId);
    if (this.communicationId && (this.mode === 'edit' || this.mode === 'view')) {
      // current communication non set
      // current communication set but id on route different from current id
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

  setImportant() {
    const important = this.communicationForm.get('important')?.value;
    this.communicationForm.get('important')?.setValue(!important);
  }
}
