import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modulos


import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { TableComponent } from './pages/table/table.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'table', component: TableComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },
];



@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
