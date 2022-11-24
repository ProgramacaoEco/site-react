import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './fonts.css';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import SiteRoutes from './SiteRoutes';

import Rodape from './components/Rodape';
import Title from './title';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Title />
    <BrowserRouter>
        <SiteRoutes/>
    </BrowserRouter>
    <Rodape />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
