import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false  // importante
})
export class HomePage implements OnInit {
  
ngAfterViewInit() {
  const video: HTMLVideoElement | null = document.querySelector('video');
  if (video) {
    video.muted = true; // forzar que inicie muteado
    video.play();
  }
}


  constructor() { }

  ngOnInit() { }

}
