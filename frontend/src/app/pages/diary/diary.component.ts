import {Component, inject} from '@angular/core';
import {SectionHeaderComponent} from '../../components/section-header/section-header.component';
import {RouterLink} from '@angular/router';
import {AppStore} from '../../store/app.store';

@Component({
  selector: 'diary',
  imports: [
    SectionHeaderComponent,
    RouterLink
  ],
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css'
})
export class DiaryComponent {

  protected appStore = inject(AppStore);

}
