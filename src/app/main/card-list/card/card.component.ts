import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Survey } from 'src/app/shared/models/Survey';
import {FormControl} from '@angular/forms';
import { DataListService } from 'src/app/shared/services/data.service';
import { LanguageService } from 'src/app/shared/services/language.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  disableSelect = new FormControl(false)
  @Input() isSelected:number=-1;
  @Input('item') item!:Survey;
  lang:string = this.languageService.getLang()
  classType:string=''
  constructor(private DataService:DataListService
    ,private languageService:LanguageService) {     
  }


  ngOnInit(): void {
    this.languageService.updateLanguage_Emitter.subscribe(lang=>{
      this.lang=lang
    })
    this.classType=this.item.SURVEY_STATUS_EN.toLowerCase()
    if(this.classType==='closed')
      this.classType='expired'
  }

  checkIfSelected(){
    return {
      'publishedActive':this.isSelected===this.item.TEMPLATE_ID
    };
  }

  optionSelected(){
    // this.selectItem.emit(this.item.TEMPLATE_ID)
    this.DataService.selectedItem.emit(this.item.TEMPLATE_ID)
  }
}
