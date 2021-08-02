import {  NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MainComponent } from "./main/main.component";
import { AuthGuard } from "./shared/services/auth/auth-guard.services";
import { SignUpComponent } from "./sign-up/sign-up.component";
import {DataResolver} from './shared/services/DataResolver.service'

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");//ar,en
  }
  

const appRoutes:Routes = [
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'main',canActivate:[AuthGuard],component:MainComponent ,resolve:[DataResolver]},
    {path:'signup',component:SignUpComponent},
    { path: '**', redirectTo: '/login' }
]
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
          }}),
    ],
    exports:[
        RouterModule,
        HttpClientModule,
        TranslateModule
    ]
})
export class RoutingModule{}