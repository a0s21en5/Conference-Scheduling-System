import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverejectstatusComponent } from './approverejectstatus.component';

describe('ApproverejectstatusComponent', () => {
  let component: ApproverejectstatusComponent;
  let fixture: ComponentFixture<ApproverejectstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproverejectstatusComponent]
    });
    fixture = TestBed.createComponent(ApproverejectstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
