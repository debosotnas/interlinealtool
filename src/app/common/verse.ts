export interface Portion {
  passage: string;
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
