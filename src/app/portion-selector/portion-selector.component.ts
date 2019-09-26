import { Component, OnInit, Renderer2, Input, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BooksWithChapters, versesByChaptersBook } from './portion-selector-constants';
import { PassageSelection, TextPortionSelected } from '../common/verse';

const DEFAULT_BOOK_TO_LOAD = 470;

@Component({
  selector: 'app-portion-selector',
  templateUrl: './portion-selector.component.html',
  styleUrls: ['./portion-selector.component.scss']
})
export class PortionSelectorComponent implements OnInit {
  // renderer: Renderer2;

  @Output() passageSelected = new EventEmitter<TextPortionSelected>();

  @Input() passageSelection: PassageSelection;
  @Input() txtLabel: string;
  @Input() isMainSelector = false;

  listBooks = BooksWithChapters;
  listVersesByChapter = versesByChaptersBook;

  bookselected: number;
  titlePortion: string;
  versionPortion: string;

  currentBookVersesSelection = {};
  currentVerses: any = null;
  // -------- details for portion selection modal
  currentChapterHighlight: number = null;
  currentVerseHighlight: any = null;
  currentMinHighlight: any = null;
  currentMaxHighlight: any = null;
  dragVersesInProgress = false;

  currentPortionToBeLoaded: string = null;
  isEmptyPortion: boolean = null;
  // --------

  objectKeys = Object.keys;

  constructor(private modalService: NgbModal, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.listen('document', 'mouseup', (event: MouseEvent) => {
      if (this.dragVersesInProgress) {
        this.dragVersesInProgress = false;
        this.updateCurrentPortionToBeLoaded();
      }
    });

    if (this.passageSelection) {
      this.bookselected = this.passageSelection.book;
      this.currentChapterHighlight = this.passageSelection.chapter;

      this.setCurrentPortionWithMinMax(this.currentChapterHighlight,
        this.passageSelection.verseIni,
        this.passageSelection.verseEnd);

      this.updateAndLoadPortion(false);
    } else {
      this.resetSelector();
    }
  }

  resetSelector() {
    this.bookselected = DEFAULT_BOOK_TO_LOAD;
    this.onChangeBook();
}

  updateCurrentPortionToBeLoaded(): void {
    const currentObj =  this.objectKeys(this.currentVerseHighlight);
    if (!currentObj.length) {
      this.currentPortionToBeLoaded = null;
      return;
    }
    const arr = currentObj.map( (key, val) => currentObj[val]);
    const min = Math.min.apply( null, arr );
    const max = Math.max.apply( null, arr );

    this.setCurrentPortionWithMinMax(this.currentChapterHighlight, min, max);
  }

  setCurrentPortionWithMinMax(chap: number, mMin: number, mMax: number): void {
    this.currentPortionToBeLoaded =
        `${chap}:${mMin}` + (mMax != null && mMin !== mMax ? `-${mMax}` : '');
  }

  onChangeBook(): void {
    this.titlePortion = 'Seleccionar versículos';
    this.isEmptyPortion = true;
  }

  openSelection(content): void {
    this.currentVerses = null;
    this.currentVerseHighlight = {};
    this.currentChapterHighlight = null;
    this.currentPortionToBeLoaded = null;

    this.getNumberOfVerses();
    this.open(content);
  }

  open(content): void {
    this.modalService.open(content, { size: 'lg' });
  }

  getNumberOfVerses(): any {
    this.currentBookVersesSelection = this.listVersesByChapter[this.bookselected];
  }

  getBookName(): string {
    const currentBook = this.listBooks.filter( b => b.val === +this.bookselected);
    return currentBook[0].name;
  }

  showVersesOfChapter(versesToShow: number, chapterSelected: any): void {
    this.resetVersesOfChapter();
    this.currentChapterHighlight = chapterSelected;
    this.currentVerses = versesToShow;
  }

  resetVersesOfChapter(): void {
    this.currentMinHighlight = this.currentMaxHighlight = null;
    this.currentVerseHighlight = {};
  }

  arrayOne(i: number): any[] {
    return Array(i);
  }

  selectIniVerses(verse: number): void {
    this.dragVersesInProgress = true;
    this.currentMinHighlight = verse;
  }

  showDragButtons(verse: number): void {
    if (verse === this.currentMinHighlight || !this.dragVersesInProgress) {
      return;
    }
    let minv: number;
    let maxv: number;
    if (verse < this.currentMinHighlight) {
      minv = verse;
      maxv = this.currentMinHighlight;
    } else {
      maxv = verse;
      minv = this.currentMinHighlight;
    }
    this.currentVerseHighlight = {};
    for (let i: number = minv; i <= maxv; i++) {
      this.currentVerseHighlight[i] = true;
    }
  }

  selectEndVerses(verse: number): void {
    if (this.dragVersesInProgress) {
      this.currentMaxHighlight = verse;
      if (this.currentMaxHighlight === this.currentMinHighlight) {
        this.currentVerseHighlight = {};
        this.currentVerseHighlight[verse] = true;
      }
    }
  }

  updateAndLoadPortion(load: boolean = true): void {
    this.titlePortion = this.currentPortionToBeLoaded;
    if (load) {
      this.loadSimplePortion();
    }
  }

  loadSimplePortion(): void {
    this.passageSelected.emit({
      book: this.bookselected,
      textPortion: this.titlePortion
    });
    if (this.isMainSelector) {
      this.resetSelector();
    }
  }

}
