import { Component, OnInit } from '@angular/core';
import { AddUserComponent } from './add-user/add-user.component';
import { Iuser  } from './user';
import { UsersService } from './users.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  loading: boolean;
  users: Iuser[];
 constructor(private usersService: UsersService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loading = true;
    this.usersService.getAllUsers(1).subscribe(
      res => {
         this.users = res.data;
      }
    ); }
    addNewUser() {
       this.modalService.open(AddUserComponent, { size: 'lg', backdrop: 'static' });
    }
    editUser(id: number) {
      const editModalRef = this.modalService.open(AddUserComponent, { size: 'lg', backdrop: 'static' });
      editModalRef.componentInstance.Id = id;
    }
}
