import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Iuser } from '../user';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  @Input() Id: number;
  editMode = false;
  user: Iuser;
  imgSrc: string;
  constructor(private fb: FormBuilder, private usersService: UsersService) { }

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
            name: this.user.first_name + '' + this.user.last_name});
        }
    );
    }
}

}
