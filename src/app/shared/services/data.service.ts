import { Survey } from "../models/Survey";
import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
@Injectable()
export class DataListService{
    
    private data :Survey[] = []

    readData(){
        return this.http.get<Survey[]>('http://localhost:3000/getAllSurveys')
        .pipe(map((data) => {
            const arr: Survey[] = []
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    arr.push(data[key])
                }
            }
            return arr
        }),
        tap(post=>{
            this.data = post
        }))
            

    }

    constructor(private http: HttpClient){
        this.readData().subscribe()
    }
    
  

   
    
    selectedItem=new EventEmitter<number>()

    filterByName=new EventEmitter<string>()


    fullfilter=new EventEmitter<{date:FormGroup,words:string[],category:string}>()


    filterData(option:string,dateFilter:FormGroup | null,words:String[] | null,category:string | null):Survey[]{
        if(words===null||category===null||(dateFilter?.value.start==null||dateFilter===null)){
            return this.getList(option).slice()
        }
        return this.getList(option).filter(item=>{
            return (JSON.stringify(dateFilter?.value.start)<=JSON.stringify(item.SurveyPeriods[0].START_DATE))&&
                    (JSON.stringify(dateFilter?.value.end)>=JSON.stringify(item.SurveyPeriods[0].END_DATE));
        })    
    }

    private getList(option:string):Survey[]{
        if(option===''){
            return this.data
        }else if(option==="Published"){
            return this.data.filter(item=>{
                return item.SURVEY_STATUS_EN==="Published"
            })
        }else if(option==='Expired'){
            return this.data.filter(item=>{
                return item.SURVEY_STATUS_EN==="Expired"
            })
        }else{
            return this.data.filter(item=>{
                return item.SURVEY_STATUS_EN==="Closed"
            })
        }
    }
  
}