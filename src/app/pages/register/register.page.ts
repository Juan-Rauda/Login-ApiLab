import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastController } from '@ionic/angular';
import { sendEmailVerification } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {


  //definicion de campos para el registrer  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  auth = getAuth(); //inicializamos el objeto de autenticacion para que firebase pueda crear usuarios

  constructor(
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() { }

  async register() {
    if (!this.form.valid) {
      this.showToast('Completa todos los campos correctamente', 'warning');
      return;
    }

    const { email, password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.showToast('Las contraseñas no coinciden', 'danger');
      return;
    }

    if (this.isSuspiciousEmail(email!)) {
      this.showToast('Usa un correo electrónico válido', 'warning');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email!,
        password!
      );

      // ENVÍO DE CORREO DE VERIFICACIÓN
      await sendEmailVerification(userCredential.user);

      this.showToast(
        'Cuenta creada. Revisa tu correo para verificarla',
        'success'
      );

      this.router.navigateByUrl('/auth', { replaceUrl: true });

    } catch (error: any) {
      console.error(error);

      let message = 'Error al registrar usuario';

      if (error.code === 'auth/email-already-in-use') {
        message = 'Este correo ya está registrado';
      }

      this.showToast(message, 'danger');
    }
  }

  async showToast(
    message: string,
    color: 'success' | 'danger' | 'warning' | 'dark' = 'danger'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'top',
      color,
      cssClass: 'custom-toast outlined-toast',
      buttons: [{ icon: 'close', role: 'cancel' }]
    });

    await toast.present();
  }

  isSuspiciousEmail(email: string): boolean {
    const invalidDomains = ['example.com', 'test.com', 'mail.com'];
    const domain = email.split('@')[1];
    return invalidDomains.includes(domain);
  }

  goToAuth() {
    this.router.navigateByUrl('/auth');  //Direccionamiento a Login
  }
}
