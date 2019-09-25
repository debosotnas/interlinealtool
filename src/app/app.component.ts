import { Component, OnInit } from '@angular/core';
import { TextPortionSelected } from './common/verse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  textPortions: TextPortionSelected[];

  constructor() {}

  ngOnInit(): void {
    this.textPortions = new Array<TextPortionSelected>();
  }

  onSelectedPassage(evt: TextPortionSelected): void {
    this.textPortions.push(evt);
  }
}
