import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { usersServices } from '../shared/services/users.services';
import {NgxSecureCookieService} from 'ngx-secure-cookie'
import { user } from '../shared/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signIn_clicked=false
  changeOnClickStyle(){
    return {" ng-touched" : this.signIn_clicked}
  }
  formGroup!:FormGroup
  constructor(private userServices:usersServices,private router:Router,private cookie:NgxSecureCookieService) {}

  ngOnInit(): void {
    this.formGroup=new FormGroup({
      "id" : new FormControl(null,[Validators.required]),
      "password" : new FormControl(null,[Validators.required])
    })

    let cookie : user = JSON.parse(this.cookie.get("loggedIn",false))
    console.log(cookie);
    
    if(cookie){
      this.userServices.loggedIn = true
      this.userServices.username = cookie.name
      this.router.navigate(['main'])
    }
  }

  submit(){    
    this.signIn_clicked=true
    if(this.formGroup.valid){
      this.userServices.login(this.formGroup.controls['id'].value,this.formGroup.controls['password'].value)
    }
    
  }

}
