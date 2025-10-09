import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {Section} from '../models/enums/current-section.enum';

export interface AppState {
  loading: boolean;
  currentSection: Section | undefined
  subSection: string
}

const initialState: AppState = {
  loading: false,
  currentSection: undefined,
  subSection: ''
}

export const AppStore = signalStore(
  {providedIn: 'root'},
  withState<AppState>(initialState),

  withMethods((store) => ({
    showSpinner(value: boolean) { patchState(store, {loading: value}) },
    setCurrentSection: (section: Section | undefined) => patchState(store, { currentSection: section }),
    setSubSection: (subSection: string) => patchState(store, { subSection: subSection })
  }))
);
