
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from"./context/authcontext.jsx";
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './context/socketcontext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <AuthProvider>
    <SocketProvider>
  
    <App/>
    </SocketProvider>
   </AuthProvider>
   </BrowserRouter>
)
