import axios from "axios";
import {rootStore} from "../stores/RootStore.ts";

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.request.use(config => {
  rootStore.uiStore.isBusy();
  return config;
});

agent.interceptors.response.use(response => {
  rootStore.uiStore.isIdle();
  return response;
})

export default agent;
