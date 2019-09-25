export interface Portion {
  passage: string;
  passageSelection: PassageSelection;
  verses: Verse[];
}

export interface Verse {
  verse: string;
  full: string;
  words: Word[];
}

export interface Word {
  word: string;
  str: string;
  esp: string;
  fon: string;
  mor: string;
}

export interface PassageSelection {
  book: number;
  chapter: number;
  verseIni: number;
  verseEnd: number;
}

export interface TextPortionSelected {
  book: number;
  textPortion: string;
}
