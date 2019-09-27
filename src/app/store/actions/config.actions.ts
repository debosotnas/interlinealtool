import { Action } from '@ngrx/store';

export const ADVANCED_MODE  = '[CONFIG] SET ADVANCED MODE';
export const BASIC_MODE     = '[CONFIG] SET BASIC MODE';

export class AdvancedMode implements Action {
  readonly type = ADVANCED_MODE;
}

export class BasicMode implements Action {
  readonly type = BASIC_MODE;
}

export type All
  = AdvancedMode
  | BasicMode;
