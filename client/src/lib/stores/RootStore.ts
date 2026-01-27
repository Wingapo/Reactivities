import {createContext} from "react";
import CounterStore from "./CounterStore.ts";
import UiStore from "./UiStore.ts";

interface RootStore {
  counterStore: CounterStore;
  uiStore: UiStore;
}

export const rootStore: RootStore = {
  counterStore: new CounterStore(),
  uiStore: new UiStore(),
};

export const StoreContext = createContext(rootStore);
