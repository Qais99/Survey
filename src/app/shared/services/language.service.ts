import { EventEmitter } from "@angular/core"

export class LanguageService{
    private lang:string = 'en'
    updateLanguage_Emitter=new EventEmitter<string>()
    
    constructor(){
        this.updateLanguage_Emitter.subscribe(lang=>{
            this.lang=lang
        })
    }
    
    
    getLang():string{
        return this.lang
    }
    

}