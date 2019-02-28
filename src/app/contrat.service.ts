import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { catchError } from 'rxjs/operators';
import { Contrat } from './contrat';
@Injectable()
export class ContratService {
      //URL for CRUD operations
   contratUrl = "http://localhost:8063/contrats";
    //Create constructor to get Http instance
    constructor(private http:Http) { 
    }
      getAllContrats(): Observable<Contrat[]> {
          return this.http.get(this.contratUrl)
             .pipe(map(this.extractData),
              catchError(this.handleError));
  
      }
    //Create article
      createContrat(contrat: Contrat):Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.post(this.contratUrl, contrat, options)
                 .pipe(map(success => success.status),
                 catchError(this.handleError));
      }
    //Fetch article by id
      getContratById(contratId: String): Observable<Contrat> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      console.log(this.contratUrl +"/"+ contratId);
      return this.http.get(this.contratUrl +"/"+ contratId)
           .pipe(map(this.extractData)
           ,catchError(this.handleError));
      }	
    //Update article
      updateContrat(contrat: Contrat):Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.contratUrl +"/"+ contrat.id, contrat, options)
                 .pipe(map(success => success.status),
                 catchError(this.handleError));
                

      }
     
      findContratbyprix(prix: number): Observable<any> {
      return this.http.get(`${this.contratUrl}/prix/${prix}`).pipe(map(this.extractData)
      ,catchError(this.handleError));
     }
      /*
     findContratbyprix(prix: number): Observable<any> {
        return this.http.get(`${this.contratUrl}/prix/${prix}`);
      }*/
      //Delete article	
      deleteContratById(contratId: String): Observable<number> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      return this.http.delete(this.contratUrl +"/"+ contratId)
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