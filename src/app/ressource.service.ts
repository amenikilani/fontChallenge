import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { catchError } from 'rxjs/operators';
import { Ressource } from './ressource';
@Injectable()
export class RessourceService {
      //URL for CRUD operations
   ressourceUrl = "http://localhost:8063/ressources";
    //Create constructor to get Http instance
    constructor(private http:Http) { 
    }
      getAllRessources(): Observable<Ressource[]> {
          return this.http.get(this.ressourceUrl)
             .pipe(map(this.extractData),
              catchError(this.handleError));
  
      }
    //Create article
      createRessource(ressource: Ressource):Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.post(this.ressourceUrl, ressource, options)
                 .pipe(map(success => success.status),
                 catchError(this.handleError));
      }
    //Fetch article by id
      getRessourceById(ressourceId: String): Observable<Ressource> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      console.log(this.ressourceUrl +"/"+ ressourceId);
      return this.http.get(this.ressourceUrl +"/"+ ressourceId)
           .pipe(map(this.extractData)
           ,catchError(this.handleError));
      }	
    //Update article
      updateRessource(ressource: Ressource):Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.ressourceUrl +"/"+ ressource.id, ressource, options)
                 .pipe(map(success => success.status),
                 catchError(this.handleError));
                

      }
     
      findRessourcebyprix(prix: number): Observable<any> {
      return this.http.get(`${this.ressourceUrl}/prix/${prix}`).pipe(map(this.extractData)
      ,catchError(this.handleError));
     }
      /*
     findRessourcebyprix(prix: number): Observable<any> {
        return this.http.get(`${this.ressourceUrl}/prix/${prix}`);
      }*/
      //Delete article	
      deleteRessourceById(ressourceId: String): Observable<number> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      return this.http.delete(this.ressourceUrl +"/"+ ressourceId)
           .pipe(map(success => success.status)
           ,catchError(this.handleError));
      }	
    private extractData(res: Response) {
        let body = res.json();
          return body;
      }
      private handleError (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.status);
      }
  }