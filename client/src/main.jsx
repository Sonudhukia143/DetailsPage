import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/forms.css';
import '../styles/home.css';
import './App.css';
import '../styles/navbar.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
);
