import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false
})
export class RegisterPage implements OnInit {


//definicion de campos para el registrer  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  auth = getAuth(); //inicializamos el objeto de autenticacion para que firebase pueda crear usuarios

  constructor(private router: Router) {}

  ngOnInit() {}

  async register() {
    if (!this.form.valid) return;
//Validamos que los campos colocados cumplan con los formatos correctos
    const { email, password, confirmPassword } = this.form.value;
//nos aseguramos que la contraseña coincida con el apartado de Confirmar contraseña
    if (password !== confirmPassword) {
      alert('❌ Las contraseñas no coinciden');
      return;
    }
//llamamos a firebase para crear la cuenta con el email y la contraseña colocada
//al funcionar la funcion UserCredential se le asigna y contiene la info del nuevo usuario (ID, Email, Contra)
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email!, password!);
      console.log('Usuario registrado:', userCredential.user);
      this.router.navigateByUrl('/home'); //si el registro fue correcto redirecciona al Home
    } catch (error: any) {//mensaje de error (si el coreo esta en uso) 
      console.error('Error en registro:', error);
      alert('Error: ' + error.message);
    }
  }

  goToAuth() {
    this.router.navigateByUrl('/auth');  //Direccionamiento a Login
  }
}
