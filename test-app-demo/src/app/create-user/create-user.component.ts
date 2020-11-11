import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../user.service'
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  addUser: FormGroup;
  isEdit: any;
  thisId: any = false;
  errMSg:any;
  numList: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  constructor(public UserService: UserService, public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.addUser = new FormGroup({
      FirstName: new FormControl('', [Validators.required, Validators.pattern('[ a-zA-Z0-9!@#$^*%_?<>|=&()\\-`.+,:/\"]*'), Validators.maxLength(50)]),
      LastName: new FormControl('', [Validators.required, Validators.pattern('[ a-zA-Z0-9!@#$^*%_?<>|=&()\\-`.+,:/\"]*'), Validators.maxLength(50)]),
      Email_id: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+[.]+[a-z0-9.-]{2,3}')]),
      ContactNumber: new FormControl('', [Validators.required]),
    });

    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      this.thisId = id;
      this.UserService.edit(id).then(Response => {
        if (Response.status == true) {


          this.addUser.controls.FirstName.setValue(Response.data[0].FirstName);
          this.addUser.controls.LastName.setValue(Response.data[0].LastName);
          this.addUser.controls.Email_id.setValue(Response.data[0].Email_id);
          this.addUser.controls.ContactNumber.setValue(Response.data[0].ContactNumber);
        }
      })

    })
  }
  addUserMethod() {
    this.errMSg = "";
    var newuser ;
    if (this.thisId) {
      newuser = {
        _id:this.thisId,
        FirstName: (this.addUser.controls.FirstName.value),
        LastName: (this.addUser.controls.LastName.value),
        Email_id: (this.addUser.controls.Email_id.value),
        ContactNumber: (this.addUser.controls.ContactNumber.value)
      }
    }else{
       newuser = {
        FirstName: (this.addUser.controls.FirstName.value),
        LastName: (this.addUser.controls.LastName.value),
        Email_id: (this.addUser.controls.Email_id.value),
        ContactNumber: (this.addUser.controls.ContactNumber.value)
      }
    }
    

    this.UserService.createUser(newuser).then(Response => {
      if (Response.status == true) {

        console.log('vhhhhhh', Response)
        this.router.navigate(['/list']);

      }else{
        this.errMSg= Response.message 
      }
    })


  }
  
  onlyNumber(ev) {
    //debugger;
    var keyCode = window.event ? ev.keyCode : ev.which;
    //codes for 0-9
    if ((keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106) || (keyCode > 34 && keyCode < 41) || (keyCode == 16) || (keyCode == 46) || (keyCode == 9)) {

      if (((keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106)) && this.numList.indexOf(ev.key) == -1) {
        ev.preventDefault();
      }
      //restrict up to 10 digits
      if ((ev.target.value + ev.key).length > 10) {
        ev.preventDefault();
      }
      //debugger;
    }
    else {
      if (keyCode != 0 && keyCode != 8 && keyCode != 13 && !ev.ctrlKey) {
        ev.preventDefault();
      }
    }
  }
}
