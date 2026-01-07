import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-tempsensor',
  templateUrl: './tempsensor.page.html',
  styleUrls: ['./tempsensor.page.scss'],
  standalone: false
})
export class TempsensorPage implements OnInit {

  humedad:number = 0;
  temperatura:number = 0;
  mq2:number = 0;

  colorMQ2:string = '';
  chart:any;

  ngOnInit() {
    this.initFirebase();
    this.initChart();
  }

  // 📌 Leer datos del sensor desde Firebase en tiempo real
  initFirebase() {
    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);

    const sensorRef = ref(db, 'sensor');  // CAMBIA si tu nodo es diferente

    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.humedad = data.humedad ?? 0;
        this.temperatura = data.temperatura ?? 0;
        this.mq2 = data.mq2 ?? 0;

        this.updateChart();
        this.updateSemaforo();
      }
    });
  }

  // 📌 Crear gráfica inicial
  initChart() {
    const canvas = document.getElementById('tempsensorChart') as HTMLCanvasElement;

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          { label: 'Temperatura °C', borderColor:'red', data: [] },
          { label: 'Humedad %', borderColor:'blue', data: [] },
          { label: 'MQ2 Gas', borderColor:'green', data: [] }
        ]
      },
      options: {
        responsive: true,
        animation: { duration:600 }
      }
    });
  }

  // 📌 Cada actualización Firebase → se dibuja en la gráfica
  updateChart() {
    if (!this.chart) return;

    this.chart.data.labels.push('');

    this.chart.data.datasets[0].data.push(this.temperatura);
    this.chart.data.datasets[1].data.push(this.humedad);
    this.chart.data.datasets[2].data.push(this.mq2);

    // 🔥 Para que no explote memoria
if (this.chart.data.labels.length > 20) {
  this.chart.data.labels.shift();

  // ← ERROR FIX
  this.chart.data.datasets.forEach((d: any) => d.data.shift());
}


    this.chart.update();
  }

  // 📌 Color semáforo MQ2 automático
  updateSemaforo() {
    if (this.mq2 < 150) this.colorMQ2 = '#2ecc71';      // 🟢 Seguro
    else if (this.mq2 < 300) this.colorMQ2 = '#f1c40f'; // 🟡 Precaución
    else this.colorMQ2 = '#e74c3c';                     // 🔴 Peligro
  }

}
