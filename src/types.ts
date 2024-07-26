export type WordData = {
  word: string;
  score: number;
  tags: string[];
};

export type SoundLikeData = {
  word: string;
  score: number;
  numSyllables?: number;
};

export type SpellLikeData = {
  word: string;
  score: number;
};

export type EndpointType = "ml" | "sl" | "sp" | "dict";

export type Meaning = {
  partOfSpeech: string;
  definitions: {
    definition: string;
    example: string;
    synonyms: string[];
    antonyms: string[];
  }[];
};

export type Phonetic = {
  text: string;
  audio?: string;
};

export type DictionaryData = {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: Meaning[];
};
