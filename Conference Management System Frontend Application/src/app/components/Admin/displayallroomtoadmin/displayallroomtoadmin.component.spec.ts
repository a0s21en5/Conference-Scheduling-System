import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayallroomtoadminComponent } from './displayallroomtoadmin.component';

describe('DisplayallroomtoadminComponent', () => {
  let component: DisplayallroomtoadminComponent;
  let fixture: ComponentFixture<DisplayallroomtoadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayallroomtoadminComponent]
    });
    fixture = TestBed.createComponent(DisplayallroomtoadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
