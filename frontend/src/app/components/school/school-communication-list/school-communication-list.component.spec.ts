import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCommunicationListComponent } from './school-communication-list.component';

describe('SchoolCommunicationListComponent', () => {
  let component: SchoolCommunicationListComponent;
  let fixture: ComponentFixture<SchoolCommunicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolCommunicationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolCommunicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
