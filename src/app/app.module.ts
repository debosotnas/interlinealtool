import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { VerseComponent } from './verse/verse.component';
import { WordComponent } from './word/word.component';
import { PortionComponent } from './portion/portion.component';

@NgModule({
  declarations: [
    AppComponent,
    VerseComponent,
    WordComponent,
    PortionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
