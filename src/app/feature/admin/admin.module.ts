import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent, FoodTruckComponent, FoodTruckMenuComponent, MenuTodayComponent } from './component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DialogBoxComponent } from '../../shared/components/dialog-box/dialog-box.component';
import { HttpClientModule } from '@angular/common/http';
import {DayPilotModule} from "@daypilot/daypilot-lite-angular";


@NgModule({
  declarations: [
    AdminHomeComponent,
    FoodTruckComponent,
    FoodTruckMenuComponent,
    MenuTodayComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatPaginatorModule,
    DayPilotModule
  ]
})
export class AdminModule { }
