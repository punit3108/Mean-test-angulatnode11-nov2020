import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service'
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: any
  constructor(public UserService: UserService, public router: Router) { }

  ngOnInit(): void {

    this.UserService.list().then(Response => {
      if (Response.status == true) {

        this.users = Response.data

      }
    })

  }

  edit(user) {  

      this.router.navigate(['/edit', user._id]);  
  
  }

  delete(user) {
    this.UserService.delete(user._id).then(Response => {
      if (Response.status == true) {

        this.ngOnInit()
      }
    })
  }

}
