
import React from 'react';
import { createRoot } from 'react-dom/client'; 
import './index.css';
import App from './App';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

AOS.init();

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); 

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
