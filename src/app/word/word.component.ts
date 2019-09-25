import { Component, OnInit, Input } from '@angular/core';
import { Word } from '../common/verse';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  @Input() word: Word;

  constructor() { }

  ngOnInit() {

  }

}
