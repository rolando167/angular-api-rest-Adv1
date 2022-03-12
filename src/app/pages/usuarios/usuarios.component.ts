import { Component, OnInit } from '@angular/core';
import { map, throwError } from 'rxjs';
import { UserModel } from 'src/app/models/user-model.model';
import { UsuariosService } from 'src/app/_services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  title : string = 'Lista de usuarios 2022';

  userModel?: UserModel[];// tipo collection []

  currentUser?: UserModel = {};

  mensajeError! : string;

  constructor(private _usuarioService :  UsuariosService) { }

  ngOnInit(): void {

    this.usuariosLista();
  }

  private usuariosLista(){
    this._usuarioService.obtenerUsuarios()
      .subscribe(
        data =>{
          this.userModel = data;
        },
        () => {
          console.log('Error 😲');
          this.mensajeError = 'Ocurrió un Error';
        }
      );
  }

}
