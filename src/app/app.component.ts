import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'users';
  public userName: string;
  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.userName = localStorage.getItem('name');
     }
  }
  }
