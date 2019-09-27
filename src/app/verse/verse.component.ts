import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Verse, Word } from '../common/verse';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { Config } from '../store/models/config.model';
import { ConfigFacade } from '../store/facades/config.facade';
import { WordDetailsComponent } from '../word-details/word-details.component';

@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss']
})
export class VerseComponent implements OnInit, OnDestroy {

  @Input() verse: Verse;
  words: Word[];
  wordDetails: Word = null;

  isSmallDesign = false;
  config$: Observable<Config> = this.configFacade.config$;
  // breakPoints$: Observable<BreakpointState> = this.breakpointObserver.observe(['(min-width: 768px)']);

  constructor(private configFacade: ConfigFacade,
              private breakpointObserver: BreakpointObserver,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.words = this.verse.words;

    this.breakpointObserver
      .observe(['(min-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isSmallDesign = false;
        } else {
          this.isSmallDesign = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.breakpointObserver.ngOnDestroy();
  }

  showWordDetails(word: Word): void {
    if (this.isSmallDesign) {
      if (this.wordDetails) {
        this.closeWordDetails();
      }
      const modalRef = this.modalService.open(WordDetailsComponent);
      modalRef.componentInstance.wordDetails = word;
    } else {
      this.words.map((item: Word) => item.highlight = false);
      word.highlight = true;
      this.wordDetails = word;
    }
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

  closeWordDetails(): void {
    this.words.map((item: Word) => item.highlight = false);
    this.wordDetails = null;
  }

}
