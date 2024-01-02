import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}
  logOut() {
    console.log('hola');
    this.userService.logout();
  }
}
