import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: ['', Validators.required],
      password: ['', Validators.required],
      cp: ['', Validators.required],
    });
  }

  ngOnInit() {}

  register() {
    if (this.registerForm.valid) {
      const name = this.registerForm.get('name')?.value;
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      const dni = this.registerForm.get('dni')?.value;
      const direccion = this.registerForm.get('direccion')?.value;
      const cp = this.registerForm.get('cp')?.value;

      let user: any = {
        email: email,
        password: password,
        name: name,
        dni: dni,
        direccion: direccion,
        cp: cp,
      };

      this.userService.register(user).subscribe((res) => {
        this.router.navigateByUrl('/albaranes');
      });
    }
  }
}
