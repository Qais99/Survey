import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from '../../shared/services/language.service';
import { usersServices } from 'src/app/shared/services/users.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private translateService: TranslateService
    ,private LaguageService:LanguageService
    ,private userService:usersServices
    ,private router:Router){
    this.translateService.setDefaultLang(this.lang);
  }

  lang:string = this.LaguageService.getLang()

  name:string=this.userService.username;
  logo:string ='';

  ngOnInit(): void {
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
