import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent implements OnInit {

  public users: IUser[] = [];
  public user: IUser;
  public userForm: FormGroup;


  constructor( private userService: UserService, private fb: FormBuilder ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [ '', Validators.required ],
      age: [ '',  Validators.required ],
      username: [ '',  Validators.required ],
    });
    this.cargarUsuarios();
  }

  updateTale(data){
    this.users = data; 
  }

  cargarUsuarios() {

    this.userService.getUsers()
      .subscribe( (resp ) => {
        
        this.users = resp;
      
    })
  }

  loadUser(user){
   
    this.user = user; 
    this.userForm.setValue({
      name: user.name,
      age: user.age,
      username: user.username
    })
  }

  addUser() {
    this.userService.createUser( this.userForm.value )
        .subscribe( () => {
          this.userForm.reset();
          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        }, (err) => {
          Swal.fire('Error', 'ocurrio un error y no se guardo el registro', 'error');
        });
  }

  updateUser() {

    if (!this.user?.id) {
      Swal.fire('Importante', 'Seleccione el regisro en la tabla que desea actualizar.', 'info');
    }else {
      this.userService.updateUser(this.userForm.value, this.user.id)
      .subscribe( () => {
        this.userForm.reset();
        Swal.fire('Actualizado', 'Cambios fueron Actualizaos', 'success');
      }, (err) => {
        Swal.fire('Error', 'ocurrio un error y no se pudo actualizar el registro', 'error');
      });
    }
    
  }

  deleteUser() {

    if (!this.user?.id) {
      Swal.fire('Importante', 'Seleccione el regisro en la tabla que desea eliminar.', 'info');
    }else {
    this.userService.delete(this.user.id)
        .subscribe( () => {
          this.userForm.reset();
          Swal.fire('Eliminado', 'Cambios fueron guardados', 'success');
        }, (err) => {
          Swal.fire('Error', 'ocurrio un error y no se pudo eliminar el registro', 'error');
        });
      }
    }
}
