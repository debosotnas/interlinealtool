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

  constructor() { }

  ngOnInit() {
    this.words = this.verse.words;
  }

}
