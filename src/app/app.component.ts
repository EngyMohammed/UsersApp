import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'users';
  public userName: string;
  constructor(private loginService: LoginService) {}
  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.userName = localStorage.getItem('name');
     }
    this.loginService.loginState$.subscribe( res => {
        if (localStorage.getItem('currentUser')) {
          this.userName = localStorage.getItem('name');
         }
      } );
   }
  }
