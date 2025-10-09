import {computed, inject, Injectable} from '@angular/core';
import {AppStore} from '../store/app.store';
import {SECTION_CONFIGS, SectionConfig} from './config/section-config';

@Injectable({ providedIn: 'root' })
export class SectionConfigService {

  private appStore = inject(AppStore);

  readonly config = computed<SectionConfig>(() => {
    const currentSection = this.appStore.currentSection();
    return SECTION_CONFIGS[currentSection!];
  });
}
