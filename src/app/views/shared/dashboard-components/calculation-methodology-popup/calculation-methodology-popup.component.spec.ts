import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationMethodologyPopupComponent } from './calculation-methodology-popup.component';

describe('CalculationMethodologyPopupComponent', () => {
  let component: CalculationMethodologyPopupComponent;
  let fixture: ComponentFixture<CalculationMethodologyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculationMethodologyPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculationMethodologyPopupComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
