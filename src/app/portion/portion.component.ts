import { Component, OnInit, Input } from '@angular/core';
import { Verse } from '../common/verse';

@Component({
  selector: 'app-portion',
  templateUrl: './portion.component.html',
  styleUrls: ['./portion.component.scss']
})
export class PortionComponent implements OnInit {

  @Input() passage: string;
  @Input() verses: Verse[];

   constructor() { }

  ngOnInit() {
  }

}
