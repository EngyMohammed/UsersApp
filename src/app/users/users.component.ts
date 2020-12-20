import { Component, HostListener, OnInit } from '@angular/core';
import { AddUserComponent } from './add-user/add-user.component';
import { Iuser  } from './user';
import { UsersService } from './users.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../shared/dialogs/dialogs.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  loading: boolean;
  users: Iuser[];
  user: Iuser;
  imgSrc: string;
  name: string;
  showDetails = false;
  userId: number;
  selectionId: number;
 constructor(private usersService: UsersService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    this.loading = true;
    this.usersService.getAllUsers(1).subscribe(
      res => {
         this.users = res.data;
      }
    ); }
    @HostListener('window:scroll', [])
    onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
     if (this.loading) {
      this.usersService.getAllUsers(2).subscribe(
        res => {
          this.users = this.users.concat(res.data);
           this.loading = false;
        }
      );
    }
  }
  }
    addNewUser() {
     this.modalService.open(AddUserComponent, { centered: true , size: 'sm'});
    }
    editUser(id: number) {
      const editModalRef = this.modalService.open(AddUserComponent, { centered: true, size: 'sm' });
            editModalRef.componentInstance.Id = id;
    }
    deleteUser(id: number, firstname: string, lastname: string) {
      const conf = this.modalService.open(DialogComponent, { centered: true, size: 'sm'});

      conf.componentInstance.dialogData = {};
      conf.componentInstance.dialogData.data = firstname + ' ' +  lastname ;
      conf.componentInstance.dialogData.message = 'Are you sure you want to delete' ;
      conf.componentInstance.dialogData.okBtnText = 'Yes';
      conf.componentInstance.dialogData.cancelBtnText = 'No';

      conf.result.then((result) => {
          this.usersService.deleteUser(id).subscribe(
            res => {
              this.toastr.success('User deleted successfully');
            },
        err => {
          console.log(err);
          this.toastr.error('User not deleted');
        }
          );
          });

     }
    getUser(id: number) {
      this.selectionId = id;
      this.showDetails = true;
      this.usersService.getUser(id).subscribe(
        res => {
          this.user = res.data as Iuser;
          this.name = this.user.first_name + ' ' + this.user.last_name;
          this.imgSrc = this.user.avatar;
          this.userId = this.user.id;
        },
        err => {
          console.log(err);
        }
    );
    }
    closeDetails() {
      this.selectionId = null;
      this.showDetails = false;
    }
}
