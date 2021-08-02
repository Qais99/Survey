import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { DataListService } from 'src/app/shared/services/data.service';
import { Survey } from '../../../shared/models/Survey';
import { ThemePalette } from '@angular/material/core';     
import { FormGroup } from '@angular/forms';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  dataSource!: Survey[];
  color: ThemePalette = "primary";
  rowSelected:number | undefined
  @Input() filterOption:string=''
  displayedColumns: string[] = ['select','TEMPLATE_ID', 'TemplateName', 'SurveyName', 'SRV_ID','SystemType','SurveyPeriods'];
  selection = new SelectionModel<Survey>(false, []);
  @Input() lang:string='ar' 


  constructor(private dataService:DataListService) {}
  

  ngOnInit(): void {
    this.dataSource=this.dataService.filterData(this.filterOption,null,null,null)
    this.selection.changed.subscribe((data)=>{
        if(data.added.length!==0){
          this.rowSelected=data.added.pop()?.TEMPLATE_ID
          this.dataService.selectedItem.emit(this.rowSelected)      
        }else{
          this.dataService.selectedItem.emit(this.rowSelected)      
        }
       })
    this.dataService.filterByName.subscribe(
      (param:string)=>{
        let data:Survey[]=this.dataService.filterData(this.filterOption,null,null,null);
        let result:Survey[]=[]
        if(param===''){
          result=data.slice()
        }else{
          data.forEach(
            (item:Survey)=>{
              if(item.SurveyName.includes(param))
                result.push(item)
            }
          )
        }
        this.dataSource=result
      })
      this.dataService.fullfilter.subscribe(
        (event:{date:FormGroup,words:string[],category:string})=>{
          this.dataSource = this.dataService.filterData(this.filterOption,event.date,event.words,event.category)
        }
      )
  }


    
}
