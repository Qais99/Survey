import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { usersServices } from '../shared/services/users.services';
import { user } from "../shared/models/User"
import { InjectSetupWrapper } from '@angular/core/testing';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  
  signUp_clicked=false
  formGroup!:FormGroup

  password1:string =''
  password2:string = ''
  


  
  constructor(private userServices:usersServices,private router:Router,private toastr: ToastrService,private formBuilder:FormBuilder) {
  }

  ngOnInit(): void {
   

    this.formGroup = this.formBuilder.group({
      username : new FormControl(null,[Validators.required]),
      password : new FormControl('',[Validators.required
        ,Validators.minLength(8)
        ,this.validationUpper.bind(this)
        ,this.validationlower.bind(this),
        this.validationNumber.bind(this),
        this.validationaymbol.bind(this)]),
      password2 : new FormControl('',[Validators.required,this.confirmPassword]),
    },{
      validator:this.confirmPassword.bind(this)
    })

      this.formGroup.get("password")?.valueChanges.subscribe(x => {
      this.password1=x+' '
  })

    this.formGroup.get("password2")?.valueChanges.subscribe(x => {
        this.password2=x
    })

  
  }

  submit(){    
    this.signUp_clicked=true
    if(this.formGroup.valid){
      let user:user = {"id":"0","name":this.formGroup.controls['username'].value,"password":this.formGroup.controls['password'].value}
      this.userServices.createUser(user).toPromise().then(data=>{
        let id=data;
        if(id!=='0'){
          this.toastr.success('user created successfully, your id is : '+ id , 'success');
          this.router.navigate(['login'])
          return 
        }
        this.toastr.error('server error . please try again later', 'Faild')
      })
    }
  }

  symbol(str:string){
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str)
  }
  Number(str:string){
    return /\d/.test(str)
  }

  isUpper(str:string) {
    return /[A-Z]/.test(str);
  }

  islower(str:string) {
    return /[a-z]/.test(str);
  }

  validationaymbol(formcontrol:FormControl){
    if(!this.symbol(formcontrol.value)){
      return {'symbol':true}
    }
    return null
  }

  validationUpper(formcontrol:FormControl){
    if(!this.isUpper(formcontrol.value)){
      return {'isUpper':true}
    }
    return null
  }

  validationNumber(formcontrol:FormControl){
    if(!this.Number(formcontrol.value)){
      return {'Number':true}
    }
    return null
  }


  validationlower(formcontrol:FormControl){
    if(!this.islower(formcontrol.value)){
      return {'isLower':true}
    }
    return null
  }

  confirmPassword(fg:FormGroup){
    if(fg.get('password')?.value===fg.get('password2')?.value){
      return null
    }
    return {'confirmPassword':true}
    
  }

  changeOnClickStyle(){
    return {" ng-touched" : this.signUp_clicked}
  }
}
