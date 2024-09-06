import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuserbyadminComponent } from './updateuserbyadmin.component';

describe('UpdateuserbyadminComponent', () => {
  let component: UpdateuserbyadminComponent;
  let fixture: ComponentFixture<UpdateuserbyadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateuserbyadminComponent]
    });
    fixture = TestBed.createComponent(UpdateuserbyadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
