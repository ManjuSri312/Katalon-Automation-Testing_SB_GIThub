import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedComponentsComponent } from './shared-components.component';

describe('SharedComponentsComponent', () => {
  let component: SharedComponentsComponent;
  let fixture: ComponentFixture<SharedComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
