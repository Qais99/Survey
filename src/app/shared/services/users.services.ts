import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { first, map } from "rxjs/internal/operators";
import { user } from "../models/User";
import { NgxSecureCookieService } from 'ngx-secure-cookie'
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class usersServices {
    


    private users: user[] = []
    public username = ''
    public loggedIn: boolean = false
    constructor(private http: HttpClient, private cookie: NgxSecureCookieService
                ,private router:Router,private toastr: ToastrService) {
        
       
        }

        login(id: string, password: string) :void {
            let isValid : boolean = false;
            this.http.get<boolean | string>('http://localhost:3000/getuser/'+id+'/'+password)
            .pipe(first())
            .subscribe(data => {
                debugger
                if(data === false || data === ''){
                    this.router.navigate(['/login']);
                }else if(data !== ''){
                    this.loggedIn = true;
                    this.username = data.toString();
                    this.cookie.set("loggedIn", JSON.stringify(data), false);
                    isValid = true
                    this.router.navigate(['/main']);
                    
                }
                if(isValid){
                    this.toastr.success('Welcome Back, ' + this.username + ' !', 'success');
                }else{
                    this.toastr.warning('Sorry, your username or password is incorrect.', 'Faild')
                }
            },error=>{
                this.router.navigate(['/login']);
                this.toastr.error('Sorry, connection falid... try again later.', 'Error')
            })
        }
    

     createUser(user: user) {
        return this.http.get('http://localhost:3000/createuser/'+user.name+'/'+user.password)
     
        
    }

    isAuthenticated() {
        return this.loggedIn
    }

    logout() {
        this.loggedIn = false
        this.cookie.delete('loggedIn')
        this.router.navigate(['/login']);
    }

    


}