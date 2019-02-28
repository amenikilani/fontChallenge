import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';import { AppComponent } from './app.component';
import { ContratComponent } from './contrat/contrat.component';
import {ContratService} from './contrat.service';
import { Routes,RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AppBoostrapModule } from './app-boostrap/app-boostrap.module';
import { RessourceComponent } from './ressource/ressource.component';
import { RessourceService } from './ressource.service';


const appRoutes: Routes = [
  { path: 'contrats', component: ContratComponent },
  { path: 'ressources', component: RessourceComponent },


];

@NgModule({
  declarations: [
    AppComponent,
    ContratComponent,
    RessourceComponent,
  ],
  imports: [
    BrowserModule,AppBoostrapModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes,{useHash:true})
  ],

  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ContratService,RessourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
