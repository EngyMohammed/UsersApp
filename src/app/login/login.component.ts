import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  error = '';
  constructor(private fb: FormBuilder, private loginService: LoginService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // loginform controls
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Dashboard';
  }
  // login function
  login(): any {
    // get username and password
    const username = this.loginForm.controls.userName.value;
    const password = this.loginForm.controls.password.value;
    this.loginService.login(username, password)
      .subscribe(data => {
        // navigate to  return url
        this.router.navigate([this.returnUrl]);
        this.error = '';
    },
    // show error in login fail
    err => {
        this.error = err.error.error;
        });
    }



}
