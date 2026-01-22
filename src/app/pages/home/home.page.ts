import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  expanded = false;

  toggleCard(index: number) {
    this.expandedCards = this.expandedCards.map((_, i) =>
      i === index ? !this.expandedCards[i] : false
    );
  }

  expandedCards: boolean[] = [false, false, false, false];

  benefits = [
    '📊 Visualización en tiempo real de sensores ambientales.',
    '🚦 Indicadores tipo semáforo para detección rápida de riesgos.',
    '📈 Gráficas dinámicas con historial de mediciones.',
    '🔔 Prevención de incidentes mediante monitoreo continuo.',
    '💻 Acceso desde cualquier dispositivo.',
    '⚙️ Integración sencilla con sensores y Firebase.',
    '🏫 Ideal para entornos educativos y académicos.',
  ];

  //funcion para el el video se mantenga muteado al estar en la pagina Principal
  ngAfterViewInit() {
    const video: HTMLVideoElement | null = document.querySelector('video');
    if (video) {
      video.muted = true; // forzar que inicie muteado
      video.play();
    }
  }

  constructor(private router: Router) {}

  ngOnInit() {}

  goToAuth() {
    this.router.navigateByUrl('/auth');
  }
}
