import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';

export interface AppState {
  loading: boolean;
}

const initialState: AppState = {
  loading: false
}

export const AppStore = signalStore(
  {providedIn: 'root'},
  withState<AppState>(initialState),

  withMethods((store) => ({
    showSpinner(value: boolean) {
      patchState(store, {loading: value});
    }
  }))
);
