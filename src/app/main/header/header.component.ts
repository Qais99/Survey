import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from '../../shared/services/language.service';
import { usersServices } from 'src/app/shared/services/users.services';
import { Router } from '@angular/router';
import { user } from 'src/app/shared/models/User';
import {NgxSecureCookieService} from 'ngx-secure-cookie'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private translateService: TranslateService
    ,private LaguageService:LanguageService
    ,private userService:usersServices
    ,private router:Router
    ,private cookie:NgxSecureCookieService){
    this.translateService.setDefaultLang(this.lang);
  }

  lang:string = this.LaguageService.getLang()

  name!:string;
  logo:string ='';

  ngOnInit(): void {
    // let cookie : user = JSON.parse(this.cookie.get("loggedIn",false));
    this.name = this.userService.username;
// debugger
//     if(!this.name){
//       this.name = cookie.name;
//     }
    let splitted=this.name.split(' ');
    splitted.forEach((item:string)=>{
      this.logo=this.logo+item.charAt(0)
    })
  }

  changeLanguage(){
    this.lang= this.lang==='ar'?'en':'ar'
    this.LaguageService.updateLanguage_Emitter.emit(this.lang)
  }

  logout(){
    this.userService.logout()
  }

}
