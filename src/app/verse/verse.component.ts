import { Component, OnInit, Input } from '@angular/core';
import { Verse, Word } from '../common/verse';

@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss']
})
export class VerseComponent implements OnInit {

  @Input() verse: Verse;
  words: Word[];
  wordDetails: Word = null;

  constructor() { }

  ngOnInit() {
    this.words = this.verse.words;
  }

  showWordDetails(word: Word): void {
    if (word === this.wordDetails) {
      this.wordDetails = null;
    } else {
      this.wordDetails = word;
    }
  }

}
