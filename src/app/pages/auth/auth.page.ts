import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut } from "firebase/auth";
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: false
})

//definimos el formulario en solo dos campos
export class AuthPage implements OnInit {

  emailVerified = false;
  showResendButton = false;
  loading = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  auth = getAuth(); //inicializamos firebase auth

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() { }

  //nuestra funcion principal donde verificamos si el formulario es valido
  async submit() {
    if (this.loading) return;
    if (!this.form.valid) return;

    const { email, password } = this.form.value;
    this.loading = true;

    const loader = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent',
      backdropDismiss: false
    });

    await loader.present();

    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email!,
        password!
      );

      const user = userCredential.user;
      await user.reload();

      this.emailVerified = user.emailVerified;


      if (!user.emailVerified) {
        this.showResendButton = true;

        // 🚨 CIERRA SESIÓN AQUÍ
        await signOut(this.auth);

        await loader.dismiss();
        
        this.showToast(
          'Verifica tu correo antes de iniciar sesión',
          'warning'
        );
        return;
      }

      this.showResendButton = false;
      this.showToast('Bienvenido a Apilab 👋', 'success');
      this.router.navigateByUrl('/home', { replaceUrl: true });

    } catch (err: any) {
      const message = this.getFirebaseErrorMessage(err.code);
      this.showToast(message, 'danger');

    } finally {
      this.loading = false;
      await loader.dismiss();
    }
  }

  async resendVerificationEmail() {
    const user = this.auth.currentUser;

    if (!user) {
      this.showToast('No hay sesión activa', 'danger');
      return;
    }

    if (user.emailVerified) {
      this.emailVerified = true;
      this.showToast('Tu correo ya está verificado', 'success');
      return;
    }

    try {
      await sendEmailVerification(user);
      this.showToast(
        'Correo de verificación reenviado. Revisa tu spam 📩',
        'success'
      );
    } catch (error) {
      this.showToast(
        'No se pudo reenviar el correo. Intenta más tarde',
        'danger'
      );
    }
  }

  async resetPassword() {
    const email = this.form.value.email;

    if (!email) {
      this.showToast(
        'Ingresa tu correo para recuperar la contraseña',
        'warning'
      );
      return;
    }

    const alert = await this.alertCtrl.create({
      header: '¿Recuperar contraseña?',
      message: `
      Se enviará un correo de recuperación a:\n\n${email}
    `,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: async () => {
            try {
              await sendPasswordResetEmail(this.auth, email);
              this.showToast(
                'Correo de recuperación enviado 📩',
                'success'
              );
            } catch (error: any) {
              this.showToast(
                this.getFirebaseErrorMessage(error.code),
                'danger'
              );
            }
          }
        }
      ],
      cssClass: 'confirm-alert'
    });

    await alert.present();
  }

  async showToast(
    message: string,
    color: 'success' | 'danger' | 'warning' | 'dark' = 'danger'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top',
      color,
      cssClass: 'custom-toast outlined-toast',
      buttons: [{ icon: 'close', role: 'cancel' }]
    });

    await toast.present();
  }

  getFirebaseErrorMessage(code: string): string {
    switch (code) {
      case 'auth/invalid-credential':
        return 'Correo o contraseña incorrectos.';
      case 'auth/invalid-email':
        return 'El correo ingresado no es válido.';
      case 'auth/network-request-failed':
        return 'Error de conexión. Intenta de nuevo.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos. Espera un momento e intenta de nuevo.';
      case 'auth/internal-error':
        return 'Firebase está ocupado. Intenta en unos segundos.';
      default:
        return 'Ocurrió un error inesperado.';
    }
  }

  goToRegister() { //enrutamiento a la pagina register
    this.router.navigateByUrl('/register');
  }
}


