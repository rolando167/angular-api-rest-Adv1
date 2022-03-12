import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user-model.model';
import { catchError, map, Observable, pluck, retry, filter, take, tap } from 'rxjs';

const BASE_URL = 'http://localhost:3000/';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  public obtenerUsuarios() : Observable<UserModel[]>{
    return this.getUsers2();
  }

  private getUsers(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(BASE_URL + 'users')
    .pipe(

      map((users: UserModel[]) => {
        console.log(users);

        return users;
      })
      // catchError(this.handleError<UserModel[]>('getHeroes', []))
    ) || null;
  }


  private getUsers2(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(BASE_URL + 'users').pipe(
      map((data : any) => data?.users || data) // Evitar informacion basura, y aglgo mas solido
    )
      || null;
  }


  registrarUsuario(data: {email: string, nombre: string}){
    //va logica de POST
    return this.http.get<UserModel[]>(BASE_URL + 'users').pipe(
      map((data : any) => data?.users || data) // Evitar informacion basura, y aglgo mas solido
    )
  }

  // se muestra vacio (pagina blanco) porque faltaba color
  // en PADRE -> app.modulets: import { HttpClientModule } from '@angular/common/http';

  // aparece el error: falta la cabecera CORS 'Access-Control-Allow-Origin',
  // desde backend Mockoon, agregar en header, Access-Control-Allow-Origin -  *
  // https://mockoon.com/docs/latest/cors/

  // el map para solo traer un objeto dentro de muchos : map((data : any) => data?.users || data)

  getUsersAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>('http://localhost:3000/users').pipe(
      map((users: UserModel[]) => {
        return users.map(user => ({
          userId: user.userId,
          name: user.firstname,
          age: `${user.lastname} years old`
        }))
      })
    )
  }

  removeUser(id: string): Observable<{}> {
    return this.http.delete(`http://localhost:3000/users/${id}`)
  }

  addUser(name: string): Observable<UserModel> {
    const user = {
      name,
      age: 30
    }
    return this.http.post<UserModel>('http://localhost:3000/users', user)
  }
}
