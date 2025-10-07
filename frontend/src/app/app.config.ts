import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {provideHttpClient} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localeIt from '@angular/common/locales/it';
import {ConfirmationService} from 'primeng/api';

registerLocaleData(localeIt, 'it');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, theme, base, primeng'
          },
          darkModeSelector: false
        }
      }
    }),
    ConfirmationService

    // { provide: LOCALE_ID, useValue: 'it' }

  ]
};
