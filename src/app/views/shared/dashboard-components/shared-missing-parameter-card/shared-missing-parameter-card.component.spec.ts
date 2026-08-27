import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedMissingParameterCardComponent } from './shared-missing-parameter-card.component';

describe('SharedMissingParameterCardComponent', () => {
  let component: SharedMissingParameterCardComponent;
  let fixture: ComponentFixture<SharedMissingParameterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedMissingParameterCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedMissingParameterCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
