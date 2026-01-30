import axios from "axios";
import {rootStore} from "../stores/RootStore.ts";
import {toast} from "react-toastify";
import {router} from "../../app/router/Routes.tsx";

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.request.use(config => {
  rootStore.uiStore.isBusy();
  return config;
});

agent.interceptors.response.use(
  response => {
    rootStore.uiStore.isIdle();
    return response;
  },
  async error => {
    rootStore.uiStore.isIdle();
    const {status, data} = error.response;
    switch (status) {
      case 400:
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error("Bad Request");
        }
        break;
      case 401:
        toast.error('Unauthorized');
        break;
      case 404:
        await router.navigate('/not-found');
        break;
      case 500:
        await router.navigate('/server-error', {
          state: {
            error: data
          }
        });
        break;
    }

    return Promise.reject(error);
  }
)

export default agent;
