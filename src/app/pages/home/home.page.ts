import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {


 //funcion para el el video se mantenga muteado al estar en la pagina Principal 
ngAfterViewInit() { 
  const video: HTMLVideoElement | null = document.querySelector('video');
  if (video) {
    video.muted = true; // forzar que inicie muteado
    video.play();
  }
}


  constructor(private router: Router) { }

  ngOnInit() { }


    goToAuth() {
    this.router.navigateByUrl('/auth');  
  }

}
