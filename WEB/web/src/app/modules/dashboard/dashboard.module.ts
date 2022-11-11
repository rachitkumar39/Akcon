import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LandingComponent } from './landing/landing.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { SharedModule } from '../shared';
import { MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    LandingComponent,
    LeftSidebarComponent,
    RightSidebarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    MatMenuModule
  ]
})
export class DashboardModule { }
