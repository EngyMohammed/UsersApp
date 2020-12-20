import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Iuser } from '../user';
import { DialogComponent } from 'src/app/shared/dialogs/dialogs.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  @Input() Id: number;
  editMode = false;
  user: Iuser;
  imgSrc: string;
  name: string;
  job: string;
  constructor(private fb: FormBuilder, private usersService: UsersService,
    private modal: NgbActiveModal, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    // add user controls
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      job: ['', [Validators.required]]
    });
    // get user in editMode
    if (this.Id) {
      this.editMode = true;
      this.usersService.getUser(this.Id).subscribe(
        res => {
          this.user = res.data as Iuser;
          this.imgSrc = this.user.avatar;
          this.userForm.patchValue({
            name: this.user.first_name + ' ' + this.user.last_name});
        }
    );
    } else {
     this.imgSrc = 'src/assets/images/default_user.png';
    }
}
// add  new user
addUser() {
  this.name = this.userForm.controls.name.value;
  this.job = this.userForm.controls.job.value;
  this.usersService.addUser(this.name, this.job).subscribe(
    res => {
      this.toastr.success('User added successfully');
      this.usersService.AddUser$.next(res);
      this.modal.dismiss();
    }
  );
}
// edit user
updateUser() {
  this.name = this.userForm.controls.name.value;
  this.job = this.userForm.controls.job.value;
  this.usersService.editUser(this.Id, this.name, this.job).subscribe(
    res => {
      this.toastr.success('User updated successfully');
      this.usersService.EditUser$.next(res);
      this.modal.dismiss();
    }
  );
}
cancel(): void {
  if (!this.userForm.touched) {
    // close if no change in popup
      this.modal.dismiss();
  } else {
   // confirmation popup
     const conf = this.modalService.open(DialogComponent, { centered: true, size: 'sm'});
     conf.componentInstance.dialogData = {};
      conf.componentInstance.dialogData.message = 'Are you sure you want to cancel ?';
      conf.componentInstance.dialogData.okBtnText = 'Yes';
      conf.componentInstance.dialogData.cancelBtnText = 'No';
      conf.result.then((result) => {
          this.modal.dismiss();
      }, (reason) => {
       });

  }



}
}
