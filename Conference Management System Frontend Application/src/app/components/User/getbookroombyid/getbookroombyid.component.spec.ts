import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetbookroombyidComponent } from './getbookroombyid.component';

describe('GetbookroombyidComponent', () => {
  let component: GetbookroombyidComponent;
  let fixture: ComponentFixture<GetbookroombyidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetbookroombyidComponent]
    });
    fixture = TestBed.createComponent(GetbookroombyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
