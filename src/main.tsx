import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme/theme.tsx";
import {Provider} from "react-redux";
import {store} from "./store";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
              <App />
          </Provider>
      </ThemeProvider>
  </StrictMode>,
)
