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

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  auth = getAuth();

  constructor(private router: Router) {}

  ngOnInit() {}

  async register() {
    if (!this.form.valid) return;

    const { email, password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      alert('❌ Las contraseñas no coinciden');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email!, password!);
      console.log('Usuario registrado:', userCredential.user);
      this.router.navigateByUrl('/home');
    } catch (error: any) {
      console.error('Error en registro:', error);
      alert('Error: ' + error.message);
    }
  }

  goToAuth() {
    this.router.navigateByUrl('/auth');
  }
}
