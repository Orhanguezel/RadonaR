import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
// import { CustomEase } from 'gsap/CustomEase'; // Na razie nie używamy skomplikowanych ease'ów

import heroImage from '../assets/images/hero.jpg';
import LanguageSelector from '../components/common/LanguageSelector';
import SearchBar from '../components/common/SearchBar';

// Minimalne Styled Components
const MainWrapper = styled.div`
    opacity: 0; /* Początkowo ukryty */
    visibility: hidden;
    background-color: #0a0a0a; /* Domyślne tło, jeśli obrazek się nie załaduje */
`;

const MainContainer = styled.div`
    position: relative;
    width: 100vw;
    height: 100svh;
    color: white; /* Upewnij się, że tekst jest widoczny */
`;

const HeroImgContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    img { object-fit: cover; }
`;

const NavStyled = styled.nav`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1.25em 1.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    transform: translateY(-100%); /* Początkowo ukryta */
`;

const NavLinks = styled.div`
    display: flex;
    gap: 1.5em;
    a { color: white; font-size: 18px; }
`;

const NavActions = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
`;
const BtnStyled = styled.div`
    a { display: flex; justify-content: center; align-items: center; font-size: 16px;
        width: 60px; height: 40px; color: #000; background-color: #fff; border-radius: 40px;
    }
`;

const SimpleText = styled.h1`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) translateY(50px); /* Początkowo trochę niżej */
    opacity: 0;
    font-size: 3rem;
    color: white;
`;


const Home = ({ isLoaderFinished }) => {
    const { t } = useTranslation(['home', 'navbar']);
    const mainWrapperRef = useRef(null);
    const navRef = useRef(null);
    const heroImgRef = useRef(null);
    const simpleTextRef = useRef(null);

    useEffect(() => {
        // Początkowe ukrycie, jeśli loader nie skończył
        if (!isLoaderFinished) {
            gsap.set(mainWrapperRef.current, { opacity: 0, visibility: 'hidden' });
        }
    }, [isLoaderFinished]);


    useEffect(() => {
        if (isLoaderFinished && mainWrapperRef.current && navRef.current && heroImgRef.current && simpleTextRef.current) {
            // Prosta animacja wejścia dla strony Home
            const tl = gsap.timeline({
                onStart: () => {
                    gsap.set(mainWrapperRef.current, { opacity: 1, visibility: 'visible' });
                }
            });

            tl.fromTo(heroImgRef.current, { scale: 1.2 }, { scale: 1, duration: 1.5, ease: "power2.out" }, 0)
              .to(navRef.current, { y: "0%", duration: 1, ease: "power2.out" }, 0.2)
              .to(simpleTextRef.current, { y: "0%", opacity: 1, duration: 1, ease: "power2.out" }, 0.5);
        
        }
    }, [isLoaderFinished]); // Uruchom tylko gdy isLoaderFinished się zmieni

    // Jeśli loader nie skończył, nie renderuj nic (lub minimalny placeholder)
    // if (!isLoaderFinished) {
    //     return null; 
    // }

    return (
        <MainWrapper ref={mainWrapperRef}>
            <MainContainer>
                <HeroImgContainer ref={heroImgRef}>
                    {/* Upewnij się, że `heroImage` jest poprawnie zaimportowane */}
                    <img src={heroImage} alt={t('home:heroAltText')} />
                </HeroImgContainer>

                <NavStyled ref={navRef}>
                    <div className="logo" style={{ fontSize: '24px', color: 'white' }}>
                        <a href="#">RadAnOr</a>
                    </div>
                    <NavLinks>
                        <a href="#">{t('navbar:about')}</a>
                        <a href="#">{t('navbar:bikes')}</a>
                        <a href="#">{t('navbar:home')}</a>
                        <a href="#">{t('navbar:stories')}</a>
                    </NavLinks>
                    <NavActions>
                        <LanguageSelector />
                        <SearchBar />
                        <BtnStyled>
                            <a href="#"><i className="fas fa-shopping-cart"></i></a>
                        </BtnStyled>
                    </NavActions>
                </NavStyled>
                
                <SimpleText ref={simpleTextRef}>
                    Strona Główna Załadowana
                </SimpleText>

                {/* Cała reszta skomplikowanego JSX (HeaderSection, CtaButton, SliderLayout, FooterFixed) 
                jest na razie ZAKOMENTOWANA, aby uprościć debugowanie.
                Odkomentujemy je, gdy podstawy będą działać.
                */}

            </MainContainer>
        </MainWrapper>
    );
};

export default Home;