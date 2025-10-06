import {Component, effect, inject, OnInit, signal, ViewChild} from '@angular/core';
import {Chip} from 'primeng/chip';
import {ContextMenu} from 'primeng/contextmenu';
import {DatePicker} from 'primeng/datepicker';
import {DatePipe, Location, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Router, RouterLink} from '@angular/router';
import {Scroller} from 'primeng/scroller';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {Communication, CommunicationFilter, EventFilterChip, EventSelectChip} from '../../../models/school-models';
import {SchoolStore} from '../../../store/school/school.store';
import {Skeleton} from 'primeng/skeleton';
import {ConfirmDialog} from 'primeng/confirmdialog';

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
    NgForOf,
    Skeleton,
    ConfirmDialog
  ],
  templateUrl: './school-communication-list.component.html',
  styleUrl: './school-communication-list.component.css'
})
export class SchoolCommunicationListComponent implements OnInit {

  protected schoolStore = inject(SchoolStore);

  contextMenuItems: MenuItem[] | undefined;

  @ViewChild('menu') menu!: ContextMenu;

  displayFilter = signal<boolean>(false);

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

  constructor(private router: Router, private confirmationService: ConfirmationService, private location: Location) {
    effect(() => {
      this.filteredCommunications = this.schoolStore.schoolCommunications().data?.communications || [];
    });
    this.schoolStore.loadCommunications();
  }

  ngOnInit(): void {
  }

  goBack() {
    if (this.canNavigate())
      this.location.back();
  }

  openContextMenu($event: MouseEvent, id: number) {
    this.contextMenuItems = [
      {
        label: 'Modifica',
        icon: 'pi pi-file-edit',
        command: () => this.router.navigate(['/school/communications', id, 'edit']),
      },
      {
        label: 'Cancella',
        icon: 'pi pi-trash',
        command: () => this.deleteCommunication(id)
      }
    ];
    this.menu.show($event);
  }

  toggleDisplayFilter() {
    this.displayFilter.set(!this.displayFilter());
  }

  deleteCommunication(id: number) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler cancellare questa comunicazione?',
      accept: () => this.schoolStore.deleteCommunication(id)
    });
  }

  applyFilter() {
    const text = this.communicationFilter.text?.toLowerCase();
    const dateFrom = this.communicationFilter?.dateFrom;
    const dateTo = this.communicationFilter?.dateTo;
    const onlyEvents = this.communicationFilter?.onlyEvents;

    let filtered = this.schoolStore.schoolCommunications().data?.communications || [];
    filtered = text
      ? filtered.filter(communication =>
        communication.title?.toLowerCase().includes(text) ||
        communication.description?.toLowerCase().includes(text))
      : filtered;
    if (this.communicationFilter.selectedChip?.type !== EventSelectChip.ALL) {
      if (this.communicationFilter.selectedChip?.type === EventSelectChip.WITH_EVENT) {
        filtered = onlyEvents
          ? filtered.filter(communication => communication.createdAt)
          : filtered;
        filtered = dateFrom
          ? filtered.filter(communication => {
            return !communication.createdAt || communication.createdAt >= dateFrom
          })
          : filtered;
        filtered = dateTo
          ? filtered.filter(communication => {
            return !communication.createdAt || communication.createdAt <= dateTo;
          })
          : filtered;
      }
      if (this.communicationFilter.selectedChip?.type === EventSelectChip.WITHOUT_EVENT) {
        filtered = filtered.filter(communication => !communication.createdAt)
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

  canNavigate() {
    const isLoading = this.schoolStore.schoolCommunications().loading;
    return !isLoading;
  }

  protected readonly EventSelectChip = EventSelectChip;
}

