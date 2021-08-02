import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Survey } from 'src/app/shared/models/Survey';
import { DataListService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  @Input() lang:string = 'en';
  selectedItem!:number;
  @Input() filterOption:string=''
  dataList!: Survey[];
  constructor(private dataService:DataListService) {
  }

  ngOnInit(): void {
    this.dataList=this.dataService.filterData(this.filterOption,null,null,null)
    
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
        this.dataList=result
      })

    this.dataService.selectedItem.subscribe(
      (param:number)=>{
        if(param==this.selectedItem){
          this.selectedItem=-1
          return
        }
        this.selectedItem=param
      }
    )

    this.dataService.fullfilter.subscribe(
      (event:{date:FormGroup,words:string[],category:string})=>{
        this.dataList = this.dataService.filterData(this.filterOption,event.date,event.words,event.category)
      }
    )
  }

  


  

}
