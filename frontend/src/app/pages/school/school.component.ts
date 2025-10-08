import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {SectionHeaderComponent} from '../../components/section-header/section-header.component';

@Component({
  selector: 'school',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    SectionHeaderComponent,
  ],
  templateUrl: './school.component.html',
  styleUrl: './school.component.css'
})
export class SchoolComponent {

}
