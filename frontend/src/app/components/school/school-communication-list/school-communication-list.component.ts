import {Component, inject, OnInit, signal} from '@angular/core';
import {Chip} from 'primeng/chip';
import {ContextMenu} from 'primeng/contextmenu';
import {DatePicker} from 'primeng/datepicker';
import {DatePipe, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {RouterLink} from '@angular/router';
import {Scroller} from 'primeng/scroller';
import {SchoolService} from '../../../services/school.service';
import {MenuItem} from 'primeng/api';
import {Communication, CommunicationFilter, EventFilterChip, EventSelectChip} from '../../../models/school-models';

@Component({
  selector: 'school-communication-list',
  imports: [
    Chip,
    ContextMenu,
    DatePicker,
    DatePipe,
    FormsModule,
    InputText,
    RouterLink,
    Scroller,
    NgForOf
  ],
  templateUrl: './school-communication-list.component.html',
  styleUrl: './school-communication-list.component.css'
})
export class SchoolCommunicationListComponent implements OnInit {

  private schoolService: SchoolService = inject(SchoolService);

  items: MenuItem[] | undefined;

  displayFilter = signal<boolean>(false);

  originalCommunications: Communication[] = [];

  filteredCommunications: Communication[] = [];

  communicationFilter: CommunicationFilter = {selectedChip: {label: 'tutte', type: EventSelectChip.ALL}};

  eventSelectChips: EventFilterChip[] = [
    {label: 'tutte', type: EventSelectChip.ALL},
    {label: 'con eventi', type: EventSelectChip.WITH_EVENT},
    {label: 'senza eventi', type: EventSelectChip.WITHOUT_EVENT}
  ];

  selectedEventChip: EventFilterChip = this.eventSelectChips.filter(c => c.type === EventSelectChip.ALL)[0];

  selectEventChip(chip: EventFilterChip) {
    this.communicationFilter.selectedChip = chip;
    this.selectedEventChip = chip;
    this.applyFilter();
  }


  ngOnInit(): void {
    this.schoolService.schoolCommunications().subscribe(data => {
      this.originalCommunications = data.communications;
      this.filteredCommunications = this.originalCommunications;
    });
    this.items = [
      {label: 'Modifica', icon: 'pi pi-file-edit'},
      {label: 'Cancella', icon: 'pi pi-trash'}
    ];
  }

  toggleDisplayFilter() {
    this.displayFilter.set(!this.displayFilter());
  }

  applyFilter() {
    const text = this.communicationFilter.text?.toLowerCase();
    const dateFrom = this.communicationFilter?.dateFrom;
    const dateTo = this.communicationFilter?.dateTo;
    const onlyEvents = this.communicationFilter?.onlyEvents;

    let filtered = this.originalCommunications;

    filtered = text
      ? filtered.filter(communication =>
        communication.title?.toLowerCase().includes(text) ||
        communication.description?.toLowerCase().includes(text))
      : filtered;
    if(this.communicationFilter.selectedChip?.type !== EventSelectChip.ALL) {
      if(this.communicationFilter.selectedChip?.type === EventSelectChip.WITH_EVENT) {
        filtered = onlyEvents
          ? filtered.filter(communication => communication.date)
          : filtered;
        filtered = dateFrom
          ? filtered.filter(communication => {
            return !communication.date || this.toDateOnly(communication.date) >= dateFrom
          })
          : filtered;
        filtered = dateTo
          ? filtered.filter(communication => {
            return !communication.date || this.toDateOnly(communication.date) <= dateTo;
          })
          : filtered;
      }
      if(this.communicationFilter.selectedChip?.type === EventSelectChip.WITHOUT_EVENT) {
        filtered = filtered.filter(communication => !communication.date)
      }
    }
    this.filteredCommunications = filtered;
  }

  toDateOnly(dateStr: string): Date {
    if (dateStr.includes('.')) {
      const [day, month, year] = dateStr.split('.');
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
    const date = new Date(dateStr);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  protected readonly EventSelectChip = EventSelectChip;
}

