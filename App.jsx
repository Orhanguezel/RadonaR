// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoaderOverlay from './components/LoaderOverlay';

// NOWY SPOSÓB IMPORTU GSAP
import gsap from 'gsap'; // Importuje domyślny eksport GSAP
import { CustomEase } from 'gsap/CustomEase'; // CustomEase nadal importujemy osobno

// Logowanie importowanych obiektów
console.log("[App.jsx] Imported gsap (default export):", gsap);
console.log("[App.jsx] Imported CustomEase object:", CustomEase);

window.gsap = gsap; // Dla diagnostyki w konsoli przeglądarki
window.CustomEase = CustomEase;

// Rejestracja pluginów
if (typeof window !== "undefined") {
    // Przy domyślnym imporcie gsap, CSSPlugin powinien być już częścią 'gsap' i auto-zarejestrowany.
    // Sprawdźmy, czy jest dostępny.
    if (gsap && gsap.plugins && gsap.plugins.CSSPlugin) {
        console.log("[App.jsx] CSSPlugin IS AVAILABLE in gsap.plugins (likely auto-registered with default import):", gsap.plugins.CSSPlugin);
    } else if (gsap && gsap.plugins) {
        console.error("[App.jsx] CSSPlugin NOT FOUND in gsap.plugins after default import. Available plugins:", gsap.plugins);
        // Można by tu spróbować awaryjnie zaimportować i zarejestrować CSSPlugin osobno,
        // ale jeśli domyślny import go nie zawiera, to jest większy problem.
        // import { CSSPlugin as SeparatelyImportedCSSPlugin } from 'gsap/CSSPlugin';
        // if (SeparatelyImportedCSSPlugin) {
        //   console.log("[App.jsx] Attempting to register separately imported CSSPlugin.");
        //   gsap.registerPlugin(SeparatelyImportedCSSPlugin);
        //   console.log("[App.jsx] After separate registration, gsap.plugins.CSSPlugin:", gsap.plugins.CSSPlugin);
        // }
    } else {
        console.error("[App.jsx] Critical: GSAP object or gsap.plugins is undefined/null after default import.");
    }

    // Rejestracja CustomEase (nadal potrzebna, bo to plugin bonusowy)
    if (gsap && CustomEase && CustomEase.get) {
        // CustomEase może wymagać jawnej rejestracji, nawet jeśli jest importowany.
        // Sprawdźmy, czy GSAP go "widzi" lub czy trzeba go zarejestrować.
        // W GSAP 3, pluginy zwykle trzeba rejestrować.
        try {
            gsap.registerPlugin(CustomEase); // Zawsze próbuj zarejestrować CustomEase
            console.log("[App.jsx] CustomEase registration attempted/successful.");
        } catch (e) {
            console.error("[App.jsx] Error registering CustomEase:", e);
        }

        if (!CustomEase.get("hop")) {
            CustomEase.create("hop", "0.9, 0, 0.1, 1");
        }
        if (!CustomEase.get("custom")) {
            CustomEase.create("custom", ".87,0,.13,1");
        }
    } else {
        console.error("[App.jsx] Critical: GSAP object or CustomEase (or CustomEase.get) is not available for CustomEase setup.");
    }
}

const App = () => {
  const [isLoaderAnimationComplete, setIsLoaderAnimationComplete] = useState(
    sessionStorage.getItem('loaderAnimationComplete') === 'true'
  );

  const handleLoaderLoaded = () => {
    sessionStorage.setItem('loaderAnimationComplete', 'true');
    setIsLoaderAnimationComplete(true);
  };

  return (
    <Router>
      {!isLoaderAnimationComplete && (
        <LoaderOverlay onLoaded={handleLoaderLoaded} />
      )}
      <Routes>
        <Route 
          path="/" 
          element={<Home isAppReady={isLoaderAnimationComplete} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
