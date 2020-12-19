import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface IDialogInformation {
  header: string;
  okBtnText: string;
  cancelBtnText: string;
  message: string;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: []
})
export class DialogComponent implements OnInit {
  @Input() dialogData: IDialogInformation;

 ngOnInit() {
  }

  constructor(public modal: NgbActiveModal) {
  }
  ok() {
    this.modal.close();
  }

  cancel() {
    this.modal.dismiss();

  }
}


