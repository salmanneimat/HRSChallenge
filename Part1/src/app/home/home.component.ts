import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models/user.model';
import { UserService, AuthenticationService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public myData: any = [];
  currentUser: User;
  users = [];

  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private router : Router
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id)
        .pipe(first())
        .subscribe(() => this.loadAllUsers());
  }

  editUser(user){
    console.log('user',user);
    (<HTMLInputElement>document.getElementById("id")).value = user.id; 
    (<HTMLInputElement>document.getElementById("username")).value = user.username; 
    (<HTMLInputElement>document.getElementById("firstname")).value = user.firstName;
    (<HTMLInputElement>document.getElementById("lastname")).value = user.lastName;
  }

  updateData(){
    let userObject = {
      id: (<HTMLInputElement>document.getElementById("id")).value,
      username: (<HTMLInputElement>document.getElementById("username")).value,
      firstName:(<HTMLInputElement>document.getElementById("firstname")).value,
      lastName: (<HTMLInputElement>document.getElementById("lastname")).value
    }
    console.log('object', userObject);

    this.userService.edit(userObject)
        .pipe(first())
        .subscribe(
            data => {
              console.log('data',data);
              this.userService.getAll();
            });
  }


  private loadAllUsers() {
    this.userService.getAll()
        .pipe(first())
        .subscribe(users => this.users = users);
  }

}
