import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Verse, Portion, PassageSelection, TextPortionSelected } from '../common/verse';
import { ConfigService } from '../services/config.service';

import { Observable } from 'rxjs';
import { Config } from '../store/models/config.model';
import { ConfigFacade } from '../store/facades/config.facade';

@Component({
  selector: 'app-portion',
  templateUrl: './portion.component.html',
  styleUrls: ['./portion.component.scss']
})
export class PortionComponent implements OnInit {

  @Output() portionLoaded = new EventEmitter<any>();
  @Output() portionDeleted = new EventEmitter<TextPortionSelected>();

  @Input() textPortion: TextPortionSelected;

  config$: Observable<Config> = this.configFacade.config$;

  passage: string;
  verses: Verse[];
  passageSelection: PassageSelection;
  showOptionsOnSmallDevices = false;

  isLoadingView = false;

   constructor(private configService: ConfigService, private configFacade: ConfigFacade) { }

  ngOnInit() {
    if (this.textPortion) {
      this.loadPortion(this.textPortion);
    }
  }

  loadPortion(textPortion: TextPortionSelected) {
    this.isLoadingView = true;

    this.configService.getVerses(textPortion)
      .subscribe((data: Portion) => {
        this.passage = data.passage;
        this.verses = data.verses;
        this.passageSelection = data.passageSelection;

        this.portionLoaded.emit();
        this.isLoadingView = false;
      });
  }

  onSelectedPassage(evt: TextPortionSelected): void {
    this.loadPortion(evt);
  }

  emptyPortion(passage: string): void {
    if (confirm(`Quitar "${passage}"?`)) {
      this.portionDeleted.emit(this.textPortion);
      // console.log('borrar!');
    }
  }

  showHideOptions(): void {
    this.showOptionsOnSmallDevices = !this.showOptionsOnSmallDevices;
  }

}
