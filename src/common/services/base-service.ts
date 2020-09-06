import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as Rx from "rxjs/Rx";
import { from, Observable } from 'rxjs';
import {map, catchError } from 'rxjs/operators';
import {empty,  throwError, observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';



@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(private httpClient: HttpClient,private loader:NgxSpinnerService) {}

  private SERVER = "https://5f548907e5de110016d52200.mockapi.io/api/v1/items?sortBy=createdAt&order=desc";
  //private SERVER =  "https://5f548907e5de110016d52200.mockapi.io/api/v1/items/?p=1&l=7"

    ///////* Fetch data Form server *///
    get(id?:number): Observable<any>{
      this.loader.show();
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Accept', 'application/json');
      // headers = headers.append(
      //   include more headeres if required
      // );
      return this.httpClient.get(
        this.SERVER +(id?id:''),
         {headers: headers}
        ).pipe(
             map((data:Response) => {
              this.loader.hide();
               return data;
             }), catchError( error => {
              if (error.status == 200) {
                this.loader.hide();
                return empty()
            }
              this.loader.hide();
               return throwError(this.handleError(error));
             })
          )
      }
       ///////* Post data to server *///
      post(data?:any): Observable<any>{
        this.loader.show();
        let headers: HttpHeaders = new HttpHeaders();
        let server = "https://5f548907e5de110016d52200.mockapi.io/api/v1/items";
        headers = headers.append('Accept', 'application/json');
        // headers = headers.append(
        //   include more headeres if required
        // );
        return this.httpClient.post(
          server,data,
           {headers: headers}
          ).pipe(
            map((data:Response) => {
             this.loader.hide();
              return data;
            }), catchError( error => {
             if (error.status == 200) {
               this.loader.hide();
               return empty()
           }
             this.loader.hide();
              return throwError(this.handleError(error));
            })
         )
        }
        ///////* Delete data to server *///
      delete(item?:any): Observable<any>{
        this.loader.show();
        let headers: HttpHeaders = new HttpHeaders();
        let server = `https://5f548907e5de110016d52200.mockapi.io/api/v1/items/${item.id}`;
        headers = headers.append('Accept', 'application/json');
        // headers = headers.append(
        //   include more headeres if required
        // );
        return this.httpClient.delete(
          server,
           {headers: headers}
          ).pipe(
            map((data:Response) => {
             this.loader.hide();
              return data;
            }), catchError( error => {
             if (error.status == 200) {
               this.loader.hide();
               return empty()
           }
             this.loader.hide();
              return throwError(this.handleError(error));
            })
         )
        }
    /* Handling error */
    handleError(error: HttpErrorResponse) { 
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side errors
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
    }
}
