import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Config } from '../models/config.model';
import * as ConfigActions from '../actions/config.actions';

interface AppState {
  config: Config;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigFacade {

  public config$: Observable<Config> = this.store.select('config');

  constructor(private store: Store<AppState>) {}

  setAdvancedMode(): void {
    this.store.dispatch(new ConfigActions.AdvancedMode());
  }

  setBasicMode(): void {
    this.store.dispatch(new ConfigActions.BasicMode());
  }

}
