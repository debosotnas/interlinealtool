import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { postReducer } from './store/reducers/config.reducer';
import { AppComponent } from './app.component';
import { VerseComponent } from './verse/verse.component';
import { WordComponent } from './word/word.component';
import { PortionComponent } from './portion/portion.component';
import { PortionSelectorComponent } from './portion-selector/portion-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    VerseComponent,
    WordComponent,
    PortionComponent,
    PortionSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    StoreModule.forRoot({ config: postReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
