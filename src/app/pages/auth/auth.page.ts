import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: false
})
export class AuthPage implements OnInit {

  form = new FormGroup ({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  submit() {

    if (this.form.valid) {
      this.router.navigateByUrl('/home');
    }

  }

}
