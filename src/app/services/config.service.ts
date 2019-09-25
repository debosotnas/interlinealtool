import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Portion } from '../common/verse';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  versesURL = 'assets/verse-demo.json';

  constructor(private http: HttpClient) { }

  getVerses() {
    return this.http.get<Portion>(this.versesURL);
  }
}
