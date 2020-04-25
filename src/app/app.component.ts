import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from  './auth/auth.service';
import { MessagingService } from "./_services/messaging.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser = null;
  title = 'ayuScholar';
  isLogin: boolean = false;
  isUser: boolean = false;
  message;

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private messagingService: MessagingService
  ) {
   
  }

  ngOnInit(){

    if(this.authenticationService.isLoggedIn){
      this.router.navigate(['dashboard']);
      this.isLogin = true;
      this.isUser = true;

    }else{
      this.router.navigate(['login']);

    }
  
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
    //console.log(this.message);
 }
}
