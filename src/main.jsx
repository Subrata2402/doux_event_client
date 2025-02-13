import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProvider from './store/ThemeContext.jsx';
import { SnackbarProvider } from 'notistack';
import AuthProvider from './store/AuthContext.jsx';
import EventProvider from './store/EventContext.jsx';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AuthProvider>
      <EventProvider>
        <SnackbarProvider maxSnack={3}>
          <StrictMode>
            <App />
          </StrictMode>
        </SnackbarProvider>
      </EventProvider>
    </AuthProvider>
  </ThemeProvider>
)
