import {
  Communication,
  CommunicationsResponse,
  CreateSchoolCommunication,
  ModifyCommunication
} from '../../models/school-models';
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
          // const updatedCommunications = [...store.schoolCommunications().data?.communications || [], data];
          const updatedCommunications = [data, ...(store.schoolCommunications().data?.communications || [])];
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
    modifyCommunication(id: number, modifyCommunication: ModifyCommunication) {
      patchState(store, {schoolCommunications: {...store.schoolCommunications(), loading: true}});
      appStore.showSpinner(true);
      schoolService.modifyCommunication(id, modifyCommunication).subscribe({
        next: (data) => {
          patchState(store, {
            currentCommunication: {data: data, loading: false}
          });
          const updatedCommunications = store.schoolCommunications().data?.communications.map(communication =>
           communication.id === id ? {...communication, ...data} : communication) || [];
          console.table(updatedCommunications);
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
    deleteCommunication(id: number) {
      patchState(store, {schoolCommunications: {...store.schoolCommunications(), loading: true}});
      appStore.showSpinner(true);
      schoolService.deleteCommunication(id).subscribe({
        next: (data) => {
          console.log('after next')
          const updatedCommunications = store.schoolCommunications().data?.communications.filter(communication =>
           communication.id != data.id) || [];
          console.table(updatedCommunications);
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
      patchState(store, {currentCommunication: {...store.currentCommunication(), loading: true}});
      appStore.showSpinner(true);
      schoolService.viewSchoolCommunication(communicationId).subscribe(({
        next: (data) => {
          patchState(store, {currentCommunication: {data: data, loading: false , firstLoad: true}})
        },
        error: (error) => {
          patchState(store, {currentCommunication: {data: undefined, error: error, loading: false}})
        },
        complete: () => {
          appStore.showSpinner(false);
        }
      }));
    }
  }))
);
