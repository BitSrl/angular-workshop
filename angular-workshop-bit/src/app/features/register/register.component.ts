import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl(null, [Validators.required])
  });

  roles: Array<string> = new Array<string>('admin', 'user');

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register = (): void => {
    if (this.form.valid) {
      const { username, password, role } = this.form.value;
      this.authService.register(username, password, role);
      this.router.navigateByUrl('login');
    } else {
      alert('Form is not valid');
    }
  }

}
