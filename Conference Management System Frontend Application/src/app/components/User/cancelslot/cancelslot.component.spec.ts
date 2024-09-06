import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelslotComponent } from './cancelslot.component';

describe('CancelslotComponent', () => {
  let component: CancelslotComponent;
  let fixture: ComponentFixture<CancelslotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelslotComponent]
    });
    fixture = TestBed.createComponent(CancelslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
