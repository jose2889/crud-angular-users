import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';


import { HomeComponent } from './home/home.component';

import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { TableComponent } from './table/table.component';
import { CrudComponent } from '../components/crud/crud.component';


@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    TableComponent,
    CrudComponent
  ],
  exports: [
    HomeComponent,
    PagesComponent,
    ReactiveFormsModule,
    FormsModule,
    CrudComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
