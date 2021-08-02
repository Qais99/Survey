import { Component, Inject, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Survey } from '../../shared/models/Survey';
import { DataListService } from '../../shared/services/data.service';
import { LanguageService } from '../../shared/services/language.service';


@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.css'],
  encapsulation:ViewEncapsulation.ShadowDom
})
export class DialogDetailsComponent implements OnInit {
  surveyDetails!:Survey;
  lang:string=this.languageService.getLang()
  constructor(private dataService:DataListService,@Inject(MAT_DIALOG_DATA) private data:number,private languageService:LanguageService) { }

  ngOnInit(): void {
    this.languageService.updateLanguage_Emitter.subscribe(lang=>{
      this.lang=lang
    })
    this.surveyDetails=this.dataService.filterData('',null,null,null).filter(item=>{return this.data==item.TEMPLATE_ID})[0]
  }

}
