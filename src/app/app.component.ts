import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
import { IonApp, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone:false
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Nos suscribimos al estado de login
    this.authService.loggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  // Navegación pública
  goTohome() { this.router.navigate(['/home']); }
  goToPublic1() { this.router.navigate(['/sustancias']); }
  goToPublic2() { this.router.navigate(['/sensor']); }
  goToPublic3() { this.router.navigate(['/public3']); }
  goToPublic4 () { this.router.navigate(['/listar-documentos']); }

  // Navegación privada
  goToSensor() { this.router.navigate(['/sensor']); }
  goToTempHumedad() { this.router.navigate(['/tempsensor']); }
  goToSubirDoc(){ this.router.navigate(['/subir-documentos']); }

  // Login / Logout
  goToAuth() { this.router.navigate(['/auth']); }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/home']);
    });
  }
}
