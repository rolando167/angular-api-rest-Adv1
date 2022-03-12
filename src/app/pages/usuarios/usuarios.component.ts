import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, throwError } from 'rxjs';
import { UserModel } from 'src/app/models/user-model.model';
import { UsuariosService } from 'src/app/_services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public perfilForm!: FormGroup;

  title : string = 'Lista de usuarios 2022';

  userModel?: UserModel[];// tipo collection []
  currentUser?: UserModel = {};

  mensajeError! : string;
  busqueda! : string;

  mostrarFormulario: boolean = false;

  public interObservableSubs$!: Subscription;

  constructor(private _usuarioService :  UsuariosService,
    private _route: ActivatedRoute,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.usuariosLista();
    // console.log(this._route.snapshot.children);
    this.formulario();
  }

  ngOnDestroy(): void {
    this.interObservableSubs$.unsubscribe();
  }

  formulario(){
    this.perfilForm = this.fb.group({
      nombre: ['123', Validators.required],
      email: ['abc@tes.com', [Validators.required, Validators.email]],
    });
  }

  abrirFormulario():void{
    this.mostrarFormulario = (this.mostrarFormulario) ? false : true;
  }

  guardarDatos():void{
    console.log(this.perfilForm.value);
    this._usuarioService.registrarUsuario(this.perfilForm.value)
            .subscribe(
              resp => {
                console.log(resp);
              }
            );
  }

  private usuariosLista(){
    this.interObservableSubs$ = this._usuarioService.obtenerUsuarios()
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
