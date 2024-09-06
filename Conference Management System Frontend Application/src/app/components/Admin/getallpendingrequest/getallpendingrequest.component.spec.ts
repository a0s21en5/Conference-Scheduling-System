import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallpendingrequestComponent } from './getallpendingrequest.component';

describe('GetallpendingrequestComponent', () => {
  let component: GetallpendingrequestComponent;
  let fixture: ComponentFixture<GetallpendingrequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetallpendingrequestComponent]
    });
    fixture = TestBed.createComponent(GetallpendingrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
