import { Component, OnInit } from '@angular/core';
import { TextPortionSelected } from './common/verse';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  textPortions: TextPortionSelected[];
  isLoadingView = true;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.textPortions = new Array<TextPortionSelected>();
    this.textPortions.push({
      textPortion: '1:1',
      book: 500
    });
  }

  onSelectedPassage(evt: TextPortionSelected): void {
    this.textPortions.push(evt);
    // this.textPortions.unshift(evt);
  }

  onPortionLoaded(): void {
    this.isLoadingView = false;
  }

  emptyPortions(): void {
    if (confirm('Quitar todos los pasajes?')) {
      this.textPortions.splice(0, this.textPortions.length);
    }
  }

  onPortionDeleted(evt: TextPortionSelected): void {
    const pos: number = this.textPortions.indexOf(evt);
    this.textPortions.splice(pos, 1);
  }

  open(content): void {
    this.modalService.open(content, { size: 'lg' });
  }

}
