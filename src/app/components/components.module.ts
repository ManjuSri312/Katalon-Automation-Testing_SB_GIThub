import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// import { NavbarComponent } from './navbar/navbar.component';
// import { SidebarComponent } from './sidebar/sidebar.component';
import { AppMaterialModule } from '../material.module';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
  ],
  declarations: [
  
  ],
  exports: [
  ],
  providers: [DatePipe]
})
export class ComponentsModule { }
