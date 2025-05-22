// src/components/LoaderOverlay.jsx
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { useTranslation } from 'react-i18next';

// Styled Components
const LoaderWrapper = styled.div`
    position: fixed; top: 0; left: 0; width: 100vw; height: 100svh;
    overflow: hidden; z-index: 9999; background-color: #0a0a0a;
    display: flex; align-items: center; justify-content: center;
    opacity: 1; visibility: visible;
`;
const OverlayEffect = styled.div`
    position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex;
`;
const OverlayBlock = styled.div`
    width: 50%; height: 100%; background-color: #303030;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
`;
const IntroLogoContainer = styled.div`
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    display: flex; gap: 0.25rem; z-index: 3;
`;
const WordContainer = styled.div`
    position: relative;
    h1 { font-size: 2.5rem; color: #fff; margin: 0; position: relative; will-change: transform; }
    &#word-1-container { left: -0.6rem; padding-right: 0.25rem; }
`;
const DividerLine = styled.div`
    position: absolute; top: 0; left: 50%;
    transform-origin: center top;
    width: 1px; height: 100%; background-color: #fff; z-index: 3;
`;
const SpinnerBox = styled.div`
    position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%); z-index: 3;
`;
const SpinnerElement = styled.div`
    width: 50px; height: 50px; border: 1.4px solid #fff;
    border-top-color: rgba(255, 255, 255, 0.125);
    border-radius: 50%; animation: spin 1s linear infinite;
`;
const CounterContainer = styled.div`
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    z-index: 3; width: 100%; height: auto;
`;
const CountItem = styled.div`
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    display: flex; align-items: center;
`;
const DigitContainer = styled.div`
    display: flex; justify-content: center; align-items: center;
    h1 {
        font-family: "PP Editorial Old", "PP Neue Montreal", sans-serif;
        font-size: 15rem; font-weight: 400; line-height: 1; color: #fff;
        margin: 0; position: relative; will-change: transform;
    }
`;

const TOTAL_COUNT_ITEMS = 5; // Definiujemy oczekiwaną liczbę elementów licznika

const LoaderOverlay = ({ onLoaded }) => {
    const { t } = useTranslation(['home']);
    const loaderWrapperRef = useRef(null);
    const overlayBlockLeftRef = useRef(null);
    const overlayBlockRightRef = useRef(null);
    const word1H1Ref = useRef(null);
    const word2H1Ref = useRef(null);
    const dividerLineRef = useRef(null);
    const spinnerElementRef = useRef(null);
    
    const countItemsCollectedRef = useRef(0); // Licznik zebranych refów dla CountItem
    const countItemRefs = useRef(new Array(TOTAL_COUNT_ITEMS).fill(null)); // Tablica na refy CountItem
    
    const [allRefsReady, setAllRefsReady] = useState(false); // Nowy stan

    // Efekt do sprawdzania, czy wszystkie refy są gotowe
    useEffect(() => {
        // Sprawdź, czy wszystkie podstawowe refy są przypisane
        const baseRefsAssigned = 
            loaderWrapperRef.current && overlayBlockLeftRef.current && overlayBlockRightRef.current &&
            word1H1Ref.current && word2H1Ref.current && dividerLineRef.current && spinnerElementRef.current;

        // Sprawdź, czy wszystkie refy dla CountItem są przypisane i zawierają H1
        const countItemsReady = countItemRefs.current.length === TOTAL_COUNT_ITEMS &&
            countItemRefs.current.every(itemEl => 
                itemEl && 
                Array.from(itemEl.querySelectorAll('h1')).length === 2 && // Każdy CountItem ma 2 H1
                Array.from(itemEl.querySelectorAll('h1')).every(h1 => h1)
            );

        if (baseRefsAssigned && countItemsReady) {
            setAllRefsReady(true);
        } else {
            setAllRefsReady(false); // Upewnij się, że jest false, jeśli warunki nie są spełnione
            // Możesz dodać logowanie, które refy nie są gotowe
            // console.log("Czekanie na refy:", { baseRefsAssigned, countItemsReady, collected: countItemsCollectedRef.current, totalExpected: TOTAL_COUNT_ITEMS, countItemRefs: countItemRefs.current });
        }
    }, [countItemsCollectedRef.current]); // Uruchom ponownie, gdy zmieni się liczba zebranych refów


    const assignCountItemRef = (el, index) => {
        if (el && !countItemRefs.current[index]) {
            countItemRefs.current[index] = el;
            // Zwiększ licznik zebranych refów.
            // To spowoduje ponowne uruchomienie useEffect powyżej,
            // który sprawdzi, czy wszystkie refy są gotowe.
            countItemsCollectedRef.current += 1;
        }
    };
    

    useEffect(() => {
        if (typeof window !== "undefined" && !gsap.plugins.CustomEase) {
            gsap.registerPlugin(CustomEase);
        }
        if (!CustomEase.get("hop")) CustomEase.create("hop", "0.9, 0, 0.1, 1");

        // Początkowe stany GSAP - ustawiane tylko raz lub gdy refy staną się dostępne
        // Sprawdźmy czy podstawowe refy są dostępne przed ustawieniem GSAP, aby uniknąć błędów
        if (word1H1Ref.current && word2H1Ref.current && dividerLineRef.current) {
            gsap.set(word1H1Ref.current, { y: "-120%" });
            gsap.set(word2H1Ref.current, { y: "120%" });
            gsap.set(dividerLineRef.current, { scaleY: 0 });
        }
        // Dla countItemRefs, upewnij się, że elementy istnieją
        countItemRefs.current.forEach(item => {
            if (item) { // Dodatkowe sprawdzenie
                item.querySelectorAll('h1').forEach(h1 => gsap.set(h1, { y: "120%" }));
            }
        });

        const loaderShownInSession = sessionStorage.getItem('loaderShown');
        if (loaderShownInSession === 'true') {
            if (loaderWrapperRef.current) { // Sprawdź ref przed użyciem
                gsap.set(loaderWrapperRef.current, { display: 'none' });
            }
            onLoaded();
            return;
        }
        
        // Czekaj aż wszystkie refy będą gotowe
        if (!allRefsReady) {
            if (loaderWrapperRef.current) { // Sprawdź ref
                gsap.set(loaderWrapperRef.current, { display: 'flex' }); // Pokaż loader, ale bez animacji
            }
            return; 
        }
        
        // console.log("LoaderOverlay: Uruchamianie animacji, wszystkie refy gotowe.");
        if (loaderWrapperRef.current) { // Sprawdź ref
            gsap.set(loaderWrapperRef.current, { display: 'flex' });
        }


        const tl = gsap.timeline({
            delay: 0.3, defaults: { ease: "hop" },
            onComplete: () => {
                if (loaderWrapperRef.current) { // Sprawdź ref
                    gsap.to(loaderWrapperRef.current, {
                        opacity: 0, duration: 0.5,
                        onComplete: () => {
                            gsap.set(loaderWrapperRef.current, { display: 'none' });
                            onLoaded();
                            sessionStorage.setItem('loaderShown', 'true'); // Ustaw flagę po zakończeniu animacji
                        }
                    });
                } else {
                    onLoaded(); // Jeśli ref nie istnieje, po prostu wywołaj onLoaded
                    sessionStorage.setItem('loaderShown', 'true');
                }
            }
        });
        
        // Animacja liczników - teraz pewniejsza, bo allRefsReady jest true
        countItemRefs.current.forEach((item, index) => {
            if (!item) return; // Pomiń, jeśli ref dla CountItem nie istnieje
            const h1s = Array.from(item.querySelectorAll('h1'));
            if (h1s.length > 0) { // Upewnij się, że h1s istnieją
                tl.to(h1s, { y: "0%", duration: 1, stagger: 0.075 }, index * 1);
                const exitDuration = (index < TOTAL_COUNT_ITEMS - 1) ? 1 : 0.5;
                const exitStagger = (index < TOTAL_COUNT_ITEMS - 1) ? 0.075 : 0.05;
                const exitDelayAddition = (index < TOTAL_COUNT_ITEMS - 1) ? 0 : 0.5;
                tl.to(h1s, { y: "-100%", duration: exitDuration, stagger: exitStagger }, index * 1 + 1 + exitDelayAddition);
            }
        });
        
        const firstCounterStartTime = 0;
        // Sprawdź refy przed animacją
        if (spinnerElementRef.current) tl.to(spinnerElementRef.current, { opacity: 0, duration: 0.3 }, firstCounterStartTime + 0.5);
        if (word1H1Ref.current) tl.to(word1H1Ref.current, { y: "0%", duration: 1 }, firstCounterStartTime);
        if (word2H1Ref.current) tl.to(word2H1Ref.current, { y: "0%", duration: 1 }, firstCounterStartTime);
        if (dividerLineRef.current) tl.to(dividerLineRef.current, { scaleY: "100%", duration: 1 }, firstCounterStartTime);

        const wordsFadeStartTime = (TOTAL_COUNT_ITEMS -1) * 1 + 1 + 0.5; 
        
        if (word1H1Ref.current) tl.to(word1H1Ref.current, { y: "120%", duration: 1 }, wordsFadeStartTime);
        if (word2H1Ref.current) tl.to(word2H1Ref.current, { y: "-120%", duration: 1 }, wordsFadeStartTime);
        if (dividerLineRef.current) tl.to(dividerLineRef.current, { opacity: 0, duration: 0.4 }, wordsFadeStartTime);

        if (overlayBlockLeftRef.current && overlayBlockRightRef.current) { // Sprawdź refy
            tl.to([overlayBlockLeftRef.current, overlayBlockRightRef.current], {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 1, stagger: 0.1, ease: "power2.inOut"
            }, wordsFadeStartTime + 0.3); 
        }
        
    }, [onLoaded, allRefsReady, t]); // Dodano t jako zależność jeśli jest używane w animacji (choć tu nie jest bezpośrednio)
                                    // Główna zależność to allRefsReady

    return (
        <LoaderWrapper ref={loaderWrapperRef}>
            <OverlayEffect>
                <OverlayBlock ref={overlayBlockLeftRef} />
                <OverlayBlock ref={overlayBlockRightRef} />
            </OverlayEffect>
            <IntroLogoContainer>
                <WordContainer id="word-1-container">
                    <h1 ref={word1H1Ref}><span>RadAnOr</span></h1>
                </WordContainer>
                <WordContainer>
                    {/* Upewnij się, że klucz tłumaczenia jest poprawny */}
                    <h1 ref={word2H1Ref}>{t('home:welcomeText', 'Welcome')}</h1> 
                </WordContainer>
            </IntroLogoContainer>
            <DividerLine ref={dividerLineRef} />
            <SpinnerBox><SpinnerElement ref={spinnerElementRef} /></SpinnerBox>
            <CounterContainer>
                <CountItem ref={el => assignCountItemRef(el, 0)}>
                    <DigitContainer><h1>0</h1></DigitContainer>
                    <DigitContainer><h1>3</h1></DigitContainer>
                </CountItem>
                <CountItem ref={el => assignCountItemRef(el, 1)}>
                    <DigitContainer><h1>0</h1></DigitContainer>
                    <DigitContainer><h1>2</h1></DigitContainer>
                </CountItem>
                <CountItem ref={el => assignCountItemRef(el, 2)}>
                    <DigitContainer><h1>0</h1></DigitContainer>
                    <DigitContainer><h1>1</h1></DigitContainer>
                </CountItem>
                <CountItem ref={el => assignCountItemRef(el, 3)}>
                    {/* Upewnij się, że klucze tłumaczenia są poprawne */}
                    <DigitContainer><h1>{t('home:loader_and_part1', 'And')}</h1></DigitContainer>
                    <DigitContainer><h1>{t('home:loader_and_part2', '')}</h1></DigitContainer>
                </CountItem>
                <CountItem ref={el => assignCountItemRef(el, 4)}>
                    {/* Upewnij się, że klucze tłumaczenia są poprawne */}
                    <DigitContainer><h1>{t('home:loader_go_part1', 'Go')}</h1></DigitContainer>
                    <DigitContainer><h1>{t('home:loader_go_part2', '')}</h1></DigitContainer>
                </CountItem>
            </CounterContainer>
        </LoaderWrapper>
    );
};
export default LoaderOverlay;