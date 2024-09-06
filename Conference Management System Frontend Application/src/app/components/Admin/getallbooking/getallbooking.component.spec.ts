import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallbookingComponent } from './getallbooking.component';

describe('GetallbookingComponent', () => {
  let component: GetallbookingComponent;
  let fixture: ComponentFixture<GetallbookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetallbookingComponent]
    });
    fixture = TestBed.createComponent(GetallbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
