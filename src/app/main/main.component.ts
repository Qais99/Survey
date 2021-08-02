import { Inject, ElementRef, ViewChild,Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataListService } from '../shared/services/data.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogDetailsComponent } from '../main/dialog-details/dialog-details.component';
import { DOCUMENT } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from '../shared/services/language.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'Project';
  selectedItem:number=-1
  campaignOne!: FormGroup;
  campaignTwo!: FormGroup;
  @ViewChild('search') search!:ElementRef;
  isList:boolean=false;
  lang:string = this.languageService.getLang()

  constructor(private JsonData:DataListService
    ,private dialog: MatDialog
    ,@Inject(DOCUMENT) private document: Document
    ,private translateService: TranslateService
    ,private languageService:LanguageService){
        
    this.translateService.setDefaultLang('en');

  }
  
  isTopOption(){
    if(this.lang==='en'){return {"topOptions":true}}
    return {"topLeftOptions":true}
  }

              
   ngOnInit() {
    this.languageService.updateLanguage_Emitter.subscribe(lang=>{
      this.changeLanguage(lang)
    })
    this.JsonData.selectedItem.subscribe(
      (param:number)=>{
        if(param==this.selectedItem){
          this.selectedItem=-1
          return
        }
        this.selectedItem=param
      }
    )
  }

  changeLanguage(lang:string){
    this.lang=lang
    let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  

  filterItem(search:HTMLInputElement){
    this.JsonData.filterByName.emit(search.value)
  }

  cardButton(){
    this.isList=false;
  }

  listButton(){
    this.isList=true;
  }

  
  openDialog() {
    const dialogRef = this.dialog.open(DialogDetailsComponent,{
        data:this.selectedItem
      });
  }

  onListIConSelected(){
      return this.isList?{ "bold":true}:{"bold":false}
  }

  onGridIConSelected(){
    return !this.isList?{ "bold":true}:{"bold":false}
  }

  dashboardBtnSelected(){
    if(this.selectedItem===-1){
      return {"greenBtn":true}
    }else{
      return {"enableGreenBtn":true}
    }
  }


}
