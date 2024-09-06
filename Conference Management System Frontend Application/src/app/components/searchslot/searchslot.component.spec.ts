import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchslotComponent } from './searchslot.component';

describe('SearchslotComponent', () => {
  let component: SearchslotComponent;
  let fixture: ComponentFixture<SearchslotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchslotComponent]
    });
    fixture = TestBed.createComponent(SearchslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
