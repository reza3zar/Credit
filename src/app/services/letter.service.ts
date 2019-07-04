import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';
import { AppUrl } from '../app-url';
import { FormalLetter } from '../Models/Credit/FormalLetter';
import { LetterOperationParameters } from '../Models/System/creditOperationParameters';

@Injectable({
  providedIn: 'root'
})
export class LetterService {
  public url = AppUrl;
  constructor(private http:HttpClient) { }


  public getAllLetterCollection():Observable<Array<FormalLetter>>{
    return this.http.get<Array<FormalLetter>>(this.url.letter)
  }

  public getletterById(letterId:number): Observable<any> {
    return this.http.get<any>(this.url.letter + "/"+letterId);
  }


  public setCeilingAmountthis(ceilingAmountthis):Observable<any>{
    return this.http.post(this.url.setCeilingAmountthis,ceilingAmountthis)
    }

    public expireFormalLetter(id:number,desc:string){
      var parameters=new LetterOperationParameters();
      parameters.letterId=id;
      parameters.description=desc;


      return this.http.post(this.url.expireFormalLetter,parameters);
    }


    public forceRevokeFormalLetter(id:number,desc:string){
      var parameters=new LetterOperationParameters();
      parameters.letterId=id;
      parameters.description=desc;

      return this.http.post(this.url.forceRevokeFormalLetter,parameters);
    }

    public revokeFormalLetter(id:number,desc:string){
      var parameters=new LetterOperationParameters();
      parameters.letterId=id;
      parameters.description=desc;

      return this.http.post(this.url.revokeFormalLetter,parameters);
    }

    public releaseCheck(id:number){
      return this.http.get(this.url.letter+"/"+id+"/can-release");
    }

    public addLetter(letter:FormalLetter):Observable<any>{
      return this.http.post(this.url.addLetter,letter);
     }


     public inActiveFormalLetter(id:number,desc:string){
      var parameters=new LetterOperationParameters();
      parameters.letterId=id;
      parameters.description=desc;
      return this.http.post(this.url.inActiveFormalLetter,parameters);
    }

    public activeFormalLetter(id:number,desc:string){
      var parameters=new LetterOperationParameters();
      parameters.letterId=id;
      parameters.description=desc;
      return this.http.post(this.url.activeFormalLetter,parameters);
    }


  }
