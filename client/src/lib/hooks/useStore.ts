import {useContext} from "react";
import {StoreContext} from "../stores/RootStore.ts";

const useStore = () => useContext(StoreContext);

export default useStore;
