import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { LayoutModule } from '@angular/cdk/layout';

import { postReducer } from './store/reducers/config.reducer';
import { AppComponent } from './app.component';
import { VerseComponent } from './verse/verse.component';
import { WordComponent } from './word/word.component';
import { PortionComponent } from './portion/portion.component';
import { PortionSelectorComponent } from './portion-selector/portion-selector.component';
import { WordDetailsComponent } from './word-details/word-details.component';

@NgModule({
  declarations: [
    AppComponent,
    VerseComponent,
    WordComponent,
    PortionComponent,
    PortionSelectorComponent,
    WordDetailsComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    StoreModule.forRoot({ config: postReducer })
  ],
  entryComponents: [WordDetailsComponent],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
