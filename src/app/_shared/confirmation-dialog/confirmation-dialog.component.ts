import { Component, OnInit, Inject } from '@angular/core';
import { ConfirmationDialogService } from '@app/_services/confirmation-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  message: any;
  subscription:Subscription;



  constructor(
    private confirmationDialogService: ConfirmationDialogService
  ) {
   this.subscription= this.confirmationDialogService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.message=null;
  }
}
