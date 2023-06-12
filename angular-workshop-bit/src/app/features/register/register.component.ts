import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, this.validatePasswords());

  roles: Array<string> = new Array<string>('admin', 'user');

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    const { username, password, email } = this.form.value;
    this.authService.register(username, password, email);
    this.router.navigateByUrl('login');
  }

  private validatePasswords(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password: AbstractControl | null = formGroup.get('password');
      const confirm_password: AbstractControl | null = formGroup.get('confirm_password');

      // if confirm password is in error state and doesn't include our custom error we don't do anything
      if (confirm_password?.errors && !confirm_password?.errors['passwordMismatch']) {
        return null;
      }

      let errorsMap: ValidationErrors | null = null;

      if (password?.value !== confirm_password?.value) {
        errorsMap = { passwordMismatch: true };
      }

      confirm_password?.setErrors(errorsMap);
      password?.setErrors(errorsMap);
      return errorsMap;
    };
  }
}
