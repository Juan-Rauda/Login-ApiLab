import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/service/auth.service';
// import { IonApp, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {

  isLoggedIn = false;
  userEmail: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    // Nos suscribimos al estado de login
    this.authService.loggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.userEmail = this.authService.currentUser?.email ?? null;
    });
  }

  // 🔁 Método genérico: navegar + cerrar menú
  navigateAndClose(route: string) {
    this.menuCtrl.close('start');
    this.router.navigate([route]);
  }

  // Navegación pública
  goTohome() { this.router.navigate(['/home']); }
  // goToPublic1() { this.router.navigate(['/sustancias']); }
  // goToPublic2() { this.router.navigate(['/sensor']); }
  // goToPublic3() { this.router.navigate(['/public3']); }
  goToPublic4() { this.router.navigate(['/listar-documentos']); }
  
  // Navegación privada
  // goToSensor() { this.router.navigate(['/sensor']); }
  goToTempHumedad() { this.router.navigate(['/tempsensor']); }
  goToSubirDoc() { this.router.navigate(['/subir-documentos']); }

  // 🔑 Login
  goToAuth() {
    this.menuCtrl.close();
    this.router.navigate(['/auth'], { replaceUrl: true });
  }

  // 🚪 Logout seguro
  logout() {
    this.authService.logout().then(() => {
      this.menuCtrl.close();

      // Redirige y elimina historial
      this.router.navigateByUrl('/auth', { replaceUrl: true });
    });
  }
}
