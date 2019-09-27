import { Component, OnInit, Input } from '@angular/core';
import { Verse, Word } from '../common/verse';

import { Observable } from 'rxjs';
import { Config } from '../store/models/config.model';
import { ConfigFacade } from '../store/facades/config.facade';

@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss']
})
export class VerseComponent implements OnInit {

  @Input() verse: Verse;
  words: Word[];
  wordDetails: Word = null;

  config$: Observable<Config> = this.configFacade.config$;

  constructor(private configFacade: ConfigFacade) { }

  ngOnInit() {
    this.words = this.verse.words;
  }

  showWordDetails(word: Word): void {
    // if (word === this.wordDetails) {
      // this.wordDetails = null;
    // } else {
      this.words.map((item: Word) => item.highlight = false);
      word.highlight = true;
      this.wordDetails = word;
    // }
  }

  parseFullVerse(text: string): string {

    // to do: fix: remove space before , or .

    const virtualItem = document.createElement('div');
    virtualItem.innerHTML = text;
    const allItems = virtualItem.querySelectorAll('f');

    allItems.forEach( vItem => {
      vItem.parentNode.removeChild(vItem);
    });

    return virtualItem.innerText.trim();
  }

  getStrongCode(strongCode: string): string {
    return strongCode.split('G')[1];
  }

  closeWordDetails(): void {
    this.words.map((item: Word) => item.highlight = false);
    this.wordDetails = null;
  }

  playGreekWord(): void {
    const audio = new Audio();
    const str = this.getStrongCode(this.wordDetails.str).padStart(4, '0');
    audio.src = `https://www.studylight.org/media/lexicons/greek/${str}g.mp3`;
    audio.load();
    audio.play();
  }

}
