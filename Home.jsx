// src/pages/Home.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

import Navbar from '../components/common/Navbar';
import HeroSection from '../components/home/HeroSection';
import CtaButton from '../components/common/CtaButton';
import Slider from '../components/home/Slider';
import Footer from '../components/common/Footer';

const HomeWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary || '#0a0a0a'};
  opacity: 0;
  visibility: hidden;
  will-change: opacity;
  display: flex;
  flex-direction: column;
`;

// This wrapper helps define the scrollable area before the slider takes over.
const MainContentWrapper = styled.div`
  width: 100%;
  // Its height will be determined by its content (HeroSection, CtaButton).
  // Ensures there's content to scroll past before slider activation.
`;

const ContentAfterHero = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5vh; // Adjust as needed
  padding-bottom: 10vh; // Adjust as needed
`;

const Home = ({ isAppReady }) => {
  const homeWrapperRef = useRef(null);
  const mainContentWrapperRef = useRef(null); // Ref for the content before slider
  // Note: Slider.jsx has its own internal wrapper ref (sliderWrapperRef)

  const [currentSlideNum, setCurrentSlideNum] = useState(0);
  const [totalSlidesNum, setTotalSlidesNum] = useState(0);
  const [isSliderActive, setIsSliderActive] = useState(false); // For slider activation logic

  useEffect(() => {
    if (isAppReady && homeWrapperRef.current) {
      gsap.to(homeWrapperRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.5,
        ease: 'power1.inOut'
      });
    } else if (!isAppReady && homeWrapperRef.current) {
      gsap.set(homeWrapperRef.current, { opacity: 0, visibility: 'hidden' });
    }
  }, [isAppReady]);

  const handleSlideChange = useCallback((current, total) => {
    setCurrentSlideNum(current);
    setTotalSlidesNum(total);
  }, []);

  // Effect to manage slider activation and body scroll lock
  useEffect(() => {
    if (!isAppReady) return;

    const mainContentElement = mainContentWrapperRef.current;

    const handleScroll = () => {
      if (!mainContentElement) return;

      // Calculate when the bottom of the main content (hero + CTA) is near the top of the viewport
      // This means the user has scrolled past the initial content.
      const mainContentRect = mainContentElement.getBoundingClientRect();
      const activationPoint = mainContentRect.bottom; // When bottom of main content reaches viewport top

      // Activate slider if user has scrolled past the main content or is very close to it.
      // A small buffer (e.g., 50px) can make the transition smoother.
      if (activationPoint <= 50) { // Or <= window.innerHeight * 0.1 for 10% from top
        if (!isSliderActive) {
          setIsSliderActive(true);
          document.body.style.overflowY = 'hidden'; // Lock body scroll
        }
      } else {
        if (isSliderActive) {
          setIsSliderActive(false);
          document.body.style.overflowY = 'auto'; // Unlock body scroll
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case the page loads already scrolled or content is short
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflowY = 'auto'; // Always unlock on unmount
    };
  }, [isAppReady, isSliderActive]); // Re-run if isAppReady or isSliderActive changes

  return (
    <HomeWrapper ref={homeWrapperRef}>
      <Navbar animate={isAppReady} />
      <MainContentWrapper ref={mainContentWrapperRef}>
        <HeroSection animate={isAppReady} />
        <ContentAfterHero>
          <CtaButton animate={isAppReady} href="/products" />
        </ContentAfterHero>
      </MainContentWrapper>

      {/* Slider is rendered when app is ready.
          It receives 'isActive' prop to enable its internal wheel/touch listeners. */}
      {isAppReady && (
        <Slider
          animate={isAppReady}
          isActive={isSliderActive} // Pass the active state to the Slider
          onSlideChange={handleSlideChange}
        />
      )}

      <Footer
        animate={isAppReady}
        currentSlide={currentSlideNum}
        totalSlides={totalSlidesNum}
        // Show counter only when slider is active and has slides
        showCounter={isAppReady && isSliderActive && totalSlidesNum > 0 && currentSlideNum > 0}
      />
    </HomeWrapper>
  );
};

export default Home;