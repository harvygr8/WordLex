import {create} from "zustand";
import {
  WordData,
  SoundLikeData,
  SpellLikeData,
  DictionaryData,
  EndpointType,
} from "./types";

type StoreState = {
  words: WordData[] | SoundLikeData[] | SpellLikeData[];
  setWords: (words: WordData[] | SoundLikeData[] | SpellLikeData[]) => void;
  dictionaryData: DictionaryData[];
  setDictionaryData: (data: DictionaryData[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  endpoint: EndpointType;
  setEndpoint: (endpoint: EndpointType) => void;
};

const useStore = create<StoreState>((set) => ({
  words: [],
  setWords: (words) => set({ words }),
  dictionaryData: [],
  setDictionaryData: (data) => set({ dictionaryData: data }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  endpoint: "dict",
  setEndpoint: (endpoint) => set({ endpoint }),
}));

export default useStore;
