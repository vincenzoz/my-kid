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
import {Communication, CommunicationFilter } from '../../../models/school-models';
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

  communicationFilter: CommunicationFilter = {};

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
    const important = this.communicationFilter?.important;

    let filtered = this.schoolStore.schoolCommunications().data?.communications || [];
    filtered = text
      ? filtered.filter(communication =>
        communication.title?.toLowerCase().includes(text) ||
        communication.description?.toLowerCase().includes(text))
      : filtered;
      filtered = dateFrom
        ? filtered.filter(communication => {
          return !communication.createdAt || this.normalizeDate(communication.createdAt) >= this.normalizeDate(dateFrom);
        })
      : filtered;
      filtered = dateTo
        ? filtered.filter(communication => {
          return !communication.createdAt || this.normalizeDate(communication.createdAt) <= this.normalizeDate(dateTo);
        })
      : filtered;
    filtered = important
      ? filtered.filter(communication => {
        return communication.important;
      })
      : filtered;


    this.filteredCommunications = filtered;
  }

  normalizeDate(date: string | Date) {
    const dateObject = new Date(date);
    return new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
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
}

