import {Component, inject, OnInit, signal} from '@angular/core';
import {SchoolService} from '../../services/school.service';
import {MenuItem} from 'primeng/api';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Communication, CommunicationFilter} from '../../models/school-models';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'school',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './school.component.html',
  styleUrl: './school.component.css'
})
export class SchoolComponent {

}
