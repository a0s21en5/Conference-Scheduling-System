import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsboxComponent } from './roomsbox.component';

describe('RoomsboxComponent', () => {
  let component: RoomsboxComponent;
  let fixture: ComponentFixture<RoomsboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsboxComponent]
    });
    fixture = TestBed.createComponent(RoomsboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
