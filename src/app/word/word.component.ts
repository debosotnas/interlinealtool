import { Component, OnInit, Input } from '@angular/core';
import { Word } from '../common/verse';

import { ConfigFacade } from '../store/facades/config.facade';
import { Observable } from 'rxjs';
import { Config } from 'protractor';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  @Input() word: Word;

  config$: Observable<Config> = this.configFacade.config$;

  constructor(private configFacade: ConfigFacade) { }

  ngOnInit() {

  }

}
