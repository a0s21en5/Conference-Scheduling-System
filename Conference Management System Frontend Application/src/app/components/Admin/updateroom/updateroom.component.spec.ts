import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateroomComponent } from './updateroom.component';

describe('UpdateroomComponent', () => {
  let component: UpdateroomComponent;
  let fixture: ComponentFixture<UpdateroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateroomComponent]
    });
    fixture = TestBed.createComponent(UpdateroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
