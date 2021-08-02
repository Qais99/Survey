
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router'
import { Observable } from 'rxjs';
import { Survey } from '../models/Survey';
import { DataListService } from './data.service';

@Injectable({providedIn:'root'})
export class DataResolver implements Resolve<Survey[]>{
    
    constructor(private dataService:DataListService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Survey[] | Observable<Survey[]> | Promise<Survey[]> {
        return this.dataService.readData()
    }
}