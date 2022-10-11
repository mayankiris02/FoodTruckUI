import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { } from './shared/components/header/header.component'
import { AdminHomeComponent, FoodTruckComponent, FoodTruckMenuComponent,MenuTodayComponent } from './feature/admin/component';


const routes: Routes = [
  { path: 'admin', component: AdminHomeComponent },
  { path: 'admin/foodtruck', component: FoodTruckComponent },
  { path: 'admin/foodtruckmenu', component: FoodTruckMenuComponent },
  { path: 'admin/menutoday',        component: MenuTodayComponent },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
