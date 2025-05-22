// src/App.jsx 
// (kod taki sam jak w poprzedniej odpowiedzi, gdzie zarządza isLoaderReallyDone)
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import Home from './pages/Home';
import LoaderOverlay from './components/LoaderOverlay';

const App = () => {
  const initialLoaderShown = sessionStorage.getItem('loaderShown') === 'true';
  const [isLoaderReallyDone, setIsLoaderReallyDone] = useState(initialLoaderShown);

  const handleLoaderLoaded = () => {
    sessionStorage.setItem('loaderShown', 'true');
    setIsLoaderReallyDone(true);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <GlobalStyles />
      <Router>
        {!isLoaderReallyDone && (
          <LoaderOverlay onLoaded={handleLoaderLoaded} />
        )}
        
        <Routes>
          <Route path="/" element={<Home isLoaderFinished={isLoaderReallyDone} />} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
};

export default App;

