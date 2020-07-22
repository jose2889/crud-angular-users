import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit, OnChanges {

  public users: IUser[] = [];
  // public user: IUser;
  public userForm: FormGroup;

  @Input() user: IUser = {
    name: '',
    age: 0,
    username: ''
  }
  @Output() loadAll = new EventEmitter<IUser[]>();

  constructor( private userService: UserService, private fb: FormBuilder ) {

  }



  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [ '', Validators.required ],
      age: [ '',  Validators.required ],
      username: [ '',  Validators.required ],
    });
  }

  ngOnChanges(){
    
    if (this.user) {
      this.userForm.setValue({
        name: this.user.name,
        age: this.user.age,
        username: this.user.username
      }); 
    }
    
  }

  get invalidName() {
    return this.userForm.get('name').invalid && this.userForm.get('name').touched
  }

  get invalidAge() {
    return this.userForm.get('age').invalid && this.userForm.get('age').touched
  }

  get invalidUsername() {
    return this.userForm.get('username').invalid && this.userForm.get('username').touched
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

    if ( this.userForm.invalid ) {

      return Object.values( this.userForm.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
        
      });
     
    }else {

      this.userService.createUser( this.userForm.value )
          .subscribe( (resp) => {
            this.userService.getUsers()
            .subscribe( (users ) => {
              this.loadAll.emit(users);
          })
            
            this.userForm.reset();
            Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
          }, (err) => {
            Swal.fire('Error', 'ocurrio un error y no se guardo el registro', 'error');
          });
    }
  }

  updateUser() {

    if (!this.user?.id) {
      Swal.fire('Importante', 'Seleccione el regisro en la tabla que desea actualizar.', 'info');
    }else {
      this.userService.updateUser(this.userForm.value, this.user.id)
      .subscribe( () => {
        this.userService.getUsers()
            .subscribe( (users ) => {
              this.loadAll.emit(users);
              this.user = {
                name: '',
                age: 0,
                username: ''
              }
          })
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
          this.userService.getUsers()
          .subscribe( (users ) => {
            this.loadAll.emit(users);
        })
          this.userForm.reset();
          Swal.fire('Eliminado', 'Cambios fueron guardados', 'success');
        }, (err) => {
          Swal.fire('Error', 'ocurrio un error y no se pudo eliminar el registro', 'error');
        });
      }
    }

}
