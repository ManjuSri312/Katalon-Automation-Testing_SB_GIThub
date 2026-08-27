import { Component } from '@angular/core';
import { SharedComponentsComponent } from './views/shared-components/shared-components.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedComponentsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
