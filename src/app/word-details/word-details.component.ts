import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Word } from '../common/verse';

@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.component.html',
  styleUrls: ['./word-details.component.scss']
})
export class WordDetailsComponent implements OnInit {

  @Input() wordDetails: Word = null;
  @Input() contentAsModal = true;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  getStrongCode(strongCode: string): string {
    return strongCode.split('G')[1];
  }

  playGreekWord(): void {
    const audio = new Audio();
    const str = this.getStrongCode(this.wordDetails.str).padStart(4, '0');
    audio.src = `https://www.studylight.org/media/lexicons/greek/${str}g.mp3`;
    audio.load();
    audio.play();
  }

}
