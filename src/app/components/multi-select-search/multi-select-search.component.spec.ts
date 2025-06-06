import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectSearchComponent } from './multi-select-search.component';

describe('MultiSelectSearchComponent', () => {
  let component: MultiSelectSearchComponent;
  let fixture: ComponentFixture<MultiSelectSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
