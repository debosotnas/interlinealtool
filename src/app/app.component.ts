import { Component, OnInit } from '@angular/core';

import { Verse, Portion } from './common/verse';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  passage: string;
  verses: Verse[];

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.loadPortion();
  }

  loadPortion() {
    this.configService.getVerses()
      .subscribe((data: Portion) => {
        this.passage = data.passage;
        this.verses = data.verses;
      });
  }

}
