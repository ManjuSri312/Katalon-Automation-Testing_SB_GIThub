import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportMenuComponent } from './export-menu.component';

describe('ExportMenuComponent', () => {
  let component: ExportMenuComponent;
  let fixture: ComponentFixture<ExportMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportMenuComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
