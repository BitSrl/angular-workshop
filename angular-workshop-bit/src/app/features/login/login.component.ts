import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login = (): void => {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      const exists: boolean = this.authService.login(username, password);
      if (exists) {
        this.router.navigateByUrl('search');
      } else {
        alert('User not found');
      }
    } else {
      alert('Form is not valid');
    }
  }

}
