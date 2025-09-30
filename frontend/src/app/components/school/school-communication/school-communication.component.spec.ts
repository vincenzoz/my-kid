import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCommunicationComponent } from './school-communication.component';

describe('SchoolCommunicationComponent', () => {
  let component: SchoolCommunicationComponent;
  let fixture: ComponentFixture<SchoolCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolCommunicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
