import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationHeaderComponent } from './communication-header.component';

describe('CommunicationHeaderComponent', () => {
  let component: CommunicationHeaderComponent;
  let fixture: ComponentFixture<CommunicationHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunicationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
