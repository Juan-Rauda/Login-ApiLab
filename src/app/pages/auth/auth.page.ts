import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: false
})

//definimos el formulario en solo dos campos
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  isRegister = false; // nos sirve para saber si el usuario esta en forma login (false) o el registro (true)
  auth = getAuth(); //inicializamos firebase auth

  constructor(private router: Router) {}

  ngOnInit() {}

  //nuestra funcion principal donde verificamos si el formulario es valido
  async submit() {
    if (!this.form.valid) return;

    const { email, password } = this.form.value;

    try {
      if (this.isRegister) {
        // esta funcion nos dice que si isRegister es true llamaremos a la funcion CreateuserWithEmailAndPassword
        //lo que nos registrara un usuario
        await createUserWithEmailAndPassword(this.auth, email!, password!);
        console.log('✅ Usuario registrado');
      } else {
        // de lo contracio que IsRegister es false Llamaremos a la funcion SingIn.... lo que logueara al usuario existente
        await signInWithEmailAndPassword(this.auth, email!, password!);
        console.log('✅ Usuario logueado');
      }

      this.router.navigateByUrl('/home'); // si todo se cumple de manera correcta nos redirecciona a Home (temporalmente)
    } catch (err: any) {
      console.error('❌ Error en auth:', err.message);// mensaje de error
      alert('Error: ' + err.message);
    }
  }

    goToRegister() { //enrutamiento a la pagina register
    this.router.navigateByUrl('/register');
  }

  toggleMode() { //funcion para alternar entre registro a login
    this.isRegister = !this.isRegister; 
  }
}


