import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario) {

    if(usuario.nome === 'usuario@email.com' && 
    usuario.senha === '123456') {

      this.usuarioAutenticado = true;

      this.mostarMenuEmitter.emit(true);

      this.router.navigate(['/']);

    } else {
      this.usuarioAutenticado = false;

      this.mostarMenuEmitter.emit(false);
    }
  }
}
