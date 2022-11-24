import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './App';
import PoliticaePrivacidade from './politicaeprivacidade';

function SiteRoutes(){
    return (
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/politicaeprivacidade' element={ <PoliticaePrivacidade /> } />
        </Routes>
    )
}

export default SiteRoutes;