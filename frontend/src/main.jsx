import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './contexts/appContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
