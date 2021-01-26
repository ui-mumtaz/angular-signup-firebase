import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginMode: boolean = true;

  authForm = new FormGroup({
    username: new FormControl('', [Validators.required, CustomValidators.email]),
    password: new FormControl('', [Validators.required, CustomValidators.rangeLength([5, 9])]),
  });


  //Form: FormGroup;
  constructor(private auth: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void { }

  onModeSwitch() {
    this.loginMode = !this.loginMode;
    console.log(this.loginMode);
  }
  onSubmit() {
    if (this.authForm.valid) {
      console.log(this.authForm.value);
    }

  }
  // tslint:disable-next-line: typedef
  login() {
    this.auth.login();
  }
}
