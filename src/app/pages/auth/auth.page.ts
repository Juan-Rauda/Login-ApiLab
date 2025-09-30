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
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  isRegister = false; // 🔹 false = login, true = registro
  auth = getAuth();

  constructor(private router: Router) {}

  ngOnInit() {}

  async submit() {
    if (!this.form.valid) return;

    const { email, password } = this.form.value;

    try {
      if (this.isRegister) {
        // 🔹 Registro
        await createUserWithEmailAndPassword(this.auth, email!, password!);
        console.log('✅ Usuario registrado');
      } else {
        // 🔹 Login
        await signInWithEmailAndPassword(this.auth, email!, password!);
        console.log('✅ Usuario logueado');
      }

      this.router.navigateByUrl('/home');
    } catch (err: any) {
      console.error('❌ Error en auth:', err.message);
      alert('Error: ' + err.message);
    }
  }

    goToRegister() {
    this.router.navigateByUrl('/register');
  }

  toggleMode() {
    this.isRegister = !this.isRegister;
  }
}
