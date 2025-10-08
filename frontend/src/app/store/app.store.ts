import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {CurrentSection} from '../models/enums/current-section.enum';

export interface AppState {
  loading: boolean;
  currentSection: CurrentSection
}

const initialState: AppState = {
  loading: false,
  currentSection: CurrentSection.NONE
}

export const AppStore = signalStore(
  {providedIn: 'root'},
  withState<AppState>(initialState),

  withMethods((store) => ({
    showSpinner(value: boolean) { patchState(store, {loading: value}) },
    setCurrentSection: (section: CurrentSection) => patchState(store, {currentSection: section})
  }))
);
