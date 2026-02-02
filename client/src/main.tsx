import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router";
import {router} from "./app/router/Routes.tsx";
import {rootStore, StoreContext} from "./lib/stores/RootStore.ts";
import {ToastContainer} from "react-toastify";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

const queryClient = new QueryClient();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StoreContext.Provider value={rootStore}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer
            theme="colored"
            position="bottom-right"
            hideProgressBar
          />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StoreContext.Provider>
    </LocalizationProvider>
  </StrictMode>,
);
