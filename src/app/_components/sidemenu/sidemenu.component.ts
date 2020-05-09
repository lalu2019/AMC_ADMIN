import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  menuType: string = 'dashboard';

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogout() {
   
   localStorage.clear();
   window.location.reload();
  }

  onClickLeftMenu(menyType: string) {
    this.menuType = menyType;
    this.router.navigate([menyType]);
  }

}
