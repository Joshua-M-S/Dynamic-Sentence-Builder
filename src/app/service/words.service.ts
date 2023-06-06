import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Words } from '../model/words';
import { WordType } from '../model/wordtype';
import { Sentence } from '../model/sentence';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private httpclient: HttpClient) {

   }

   getWordTypes() :Observable<WordType[]>{
    return this.httpclient.get<WordType[]>('http://[::1]:3000/word-types')
   }

   getWords(selectedWordTypeId: string): Observable<any>{
    let parameter = new HttpParams().set('wordTypesId', selectedWordTypeId);
    return this.httpclient.get('http://[::1]:3000/words',{params: parameter})
   }


postSentences(concatWords: string): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.httpclient.post('http://[::1]:3000/sentences', { Sentence: concatWords }, { headers });
}

    getSentences():Observable<Sentence[]>{
    return this.httpclient.get<Sentence[]>('http://[::1]:3000/sentences')
    }

  
}