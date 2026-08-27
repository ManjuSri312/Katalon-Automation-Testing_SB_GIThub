import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppMaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-calculation-methodology-popup',
  imports: [AppMaterialModule, CommonModule,
    FormsModule,],
  templateUrl: './calculation-methodology-popup.component.html',
  styleUrl: './calculation-methodology-popup.component.scss',
})
export class CalculationMethodologyPopupComponent {


  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any
) {}

  selectedDiagnostic = 'Simultaneous Heating/Cooling';
  healthColumns: string[] = ['name', 'value', 'weight'];

  healthData = [
    { name: 'E: Fan Efficiency Score', value: '74.60', weight: '0.35' },
    { name: 'Filter Condition Score', value: '100.00', weight: '0.25' },
    { name: 'Coil deltaP Score', value: '100.00', weight: '0.15' },
    { name: 'Controls & Stability Score', value: '92.00', weight: '0.15' },
    { name: 'Age Score', value: '30.77', weight: '0.10' },
    { name: 'Health Score (0-100)', value: '82.99', weight: '' }
  ];
  varColumns: string[] = ['var', 'val', 'unit'];

  variableData = [
    { var: 'Avg ΔkW', val: '18.4', unit: 'kW' },
    { var: 'Operating Hours', val: '4,032', unit: 'hours/yr' },
    { var: 'Tariff', val: '$0.154', unit: '$/kWh' },
    { var: 'Total Annual Savings', val: '$620k', unit: '$/yr' }
  ];

selectedTab: 'mv' | 'calc' = 'mv';
    

}
