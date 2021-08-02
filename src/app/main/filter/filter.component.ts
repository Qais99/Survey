import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DataListService } from '../../shared/services/data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})




export class FilterComponent implements OnInit {
  constructor(private dataService:DataListService){
    this.filteredWords = this.wordCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allWords.slice()));
  }


  onApply(){
    this.dataService.fullfilter.emit({date:this.range,words:this.Words,category:this.matSelectedValue})
  }

  
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ngOnInit(): void {
  }

 
  stopclose($event:any){
    $event.stopPropagation();
    //Another instructions
  }


  //chips

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  wordCtrl = new FormControl();
  filteredWords!: Observable<string[]>;
  Words: string[] = [];
  allWords: string[] = ['Example 1', 'Example 2', 'Example 3'];

  @ViewChild('WordInput') WordInput!: ElementRef<HTMLInputElement>;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.Words.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.wordCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.Words.indexOf(fruit);

    if (index >= 0) {
      this.Words.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.Words.push(event.option.viewValue);
    this.WordInput.nativeElement.value = '';
    this.wordCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allWords.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  //select

  matSelectedValue=''
  Categories: Category[] = [
    {value: 'All'},
    {value: 'Published'},
    {value: 'Expired'},
    {value: 'Closed'}
  ];
  
}


interface Category {
  value: string;
}