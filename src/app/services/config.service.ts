import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Portion, TextPortionSelected } from '../common/verse';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // versesURL = 'assets/verse-demo.json';
  versesURL = 'svc/getverses.php';

  constructor(private http: HttpClient) { }

  getVerses(textPortion: TextPortionSelected) {
    // return this.http.get<Portion>(this.versesURL);
    return this.http.get<Portion>(`${this.versesURL}?look=${textPortion.book}&portion=${textPortion.textPortion}`);
  }
}
