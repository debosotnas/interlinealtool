import { Component, OnInit, Input } from '@angular/core';

import { Verse, Portion, PassageSelection, TextPortionSelected } from '../common/verse';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-portion',
  templateUrl: './portion.component.html',
  styleUrls: ['./portion.component.scss']
})
export class PortionComponent implements OnInit {

  @Input() textPortion: TextPortionSelected;

  passage: string;
  verses: Verse[];
  passageSelection: PassageSelection;

   constructor(private configService: ConfigService) { }

  ngOnInit() {
    if (this.textPortion) {
      this.loadPortion(this.textPortion);
    }
  }

  loadPortion(textPortion: TextPortionSelected) {
    this.configService.getVerses(this.textPortion)
      .subscribe((data: Portion) => {
        this.passage = data.passage;
        this.verses = data.verses;
        this.passageSelection = data.passageSelection;
      });
  }

  onSelectedPassage(evt: TextPortionSelected): void {
    this.loadPortion(this.textPortion);
  }

}
