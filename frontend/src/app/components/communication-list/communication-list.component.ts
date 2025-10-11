import {Component, effect, inject, OnInit, signal, untracked, ViewChild} from '@angular/core';
import {Chip} from 'primeng/chip';
import {ContextMenu} from 'primeng/contextmenu';
import {DatePicker} from 'primeng/datepicker';
import {DatePipe, Location} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Router, RouterLink} from '@angular/router';
import {Scroller} from 'primeng/scroller';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {Communication, CommunicationFilter} from '../../models/school-models';
import {CommunicationStore} from '../../store/communication.store';
import {Skeleton} from 'primeng/skeleton';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {SectionHeaderComponent} from '../section-header/section-header.component';
import {AppStore} from '../../store/app.store';

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
    Skeleton,
    ConfirmDialog,
    SectionHeaderComponent
  ],
  templateUrl: './communication-list.component.html',
  styleUrl: './communication-list.component.css'
})
export class CommunicationListComponent implements OnInit {

  protected schoolStore = inject(CommunicationStore);

  protected appStore = inject(AppStore);

  contextMenuItems: MenuItem[] | undefined;

  @ViewChild('menu') menu!: ContextMenu;

  displayFilter = signal<boolean>(false);

  filteredCommunications: Communication[] = [];

  communicationFilter: CommunicationFilter = {};

  constructor(private router: Router, private confirmationService: ConfirmationService, private location: Location) {
    effect(() => {
      this.filteredCommunications = this.schoolStore.communications().data?.communications || [];
    });

    effect(() => {
      const section = this.appStore.currentSection();
      if (section) {
        untracked(() => {
          this.schoolStore.loadCommunications(this.appStore.currentSection()!);
        })
      }
    });
  }

  ngOnInit(): void {
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

    let filtered = this.schoolStore.communications().data?.communications || [];
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
}

