import {Communication, CommunicationsResponse, CreateSchoolCommunication} from '../../models/school-models';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {SchoolService} from '../../services/school.service';
import {AppStore} from '../app.store';

export interface SchoolState {
  schoolCommunications: Request<CommunicationsResponse | undefined>;
  currentCommunication: Request<Communication | undefined>;
}

const initialState: SchoolState = {
  schoolCommunications: { data: undefined, loading: false, firstLoad: false },
  currentCommunication: { data: undefined, loading: false, firstLoad: false }
}

interface Request<T> {
  data: T;
  loading: boolean
  error?: string
  firstLoad?: boolean
}

export const SchoolStore = signalStore(
  {providedIn: 'root'},
  withState<SchoolState>(initialState),

  withMethods((store,
               schoolService = inject(SchoolService),
               appStore = inject(AppStore)) => ({
    initCurrentCommunication: () => patchState(store, {currentCommunication: { data: undefined, loading: false, firstLoad: false }}),
    loadCommunications() {
      if(store.schoolCommunications().firstLoad) return;
      patchState(store, {schoolCommunications: {...store.schoolCommunications(), loading: true}});
      schoolService.schoolCommunications().subscribe({
        next: (data) => {
          patchState(store, {
            schoolCommunications: {data: data, loading: false, firstLoad: true}
          });
        },
        error: (error) => {
          patchState(store, {
            schoolCommunications: {data: undefined, loading: false, error: error}
          })
        }
      })
    },
    newCommunication(communication: CreateSchoolCommunication) {
      patchState(store, {schoolCommunications: {...store.schoolCommunications(), loading: true}});
      appStore.showSpinner(true);
      schoolService.createSchoolCommunication(communication).subscribe({
        next: (data) => {
          const updatedCommunications = [...store.schoolCommunications().data?.communications || [], data];
          patchState(store, {
            schoolCommunications: {data: {communications: updatedCommunications}, loading: false}
          });
        },
        error: (error) => {
          patchState(store, {
            schoolCommunications: {data: undefined, loading: false, error: error}
          })
        },
        complete: () => {
          appStore.showSpinner(false);
        }
      })
    },
    loadCommunication(communicationId: number) {
      // TODO implement the backend service and wrap to Request
      const fakeCommunication: Communication = {id: 1, title: "Vacanze scolastiche", description: "This is only a mock, the backend service is not implemented yet."};
      patchState(store, {
        currentCommunication: {data: fakeCommunication, loading: false}
      })
    }
  }))
);
