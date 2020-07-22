import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Tabla',
      icono: 'mdi mdi-gauge',
      url: '/table'
    },
  ];

  constructor() { }
}
