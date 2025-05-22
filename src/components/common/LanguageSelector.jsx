// src/components/common/LanguageSelector.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// --- Styled-Components dla selektora języka ---
const SelectorContainer = styled.div`
    display: flex;
    align-items: center;
`;

const LanguageSelectorStyled = styled.div`
    position: relative;
    display: inline-block;
    font-family: "PP Neue Montreal", sans-serif;
`;

const LanguageSelectorButton = styled.button`
    background-color: #fff;
    color: #000;
    padding: 8px 10px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    min-width: 75px;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.3s ease, border-color 0.3s ease;

    &:focus,
    &:hover {
        background-color: rgba(255, 255, 255, 0.904);
        border-color: #888;
        outline: none;
    }
`;

const CurrentLangFlag = styled.span`
    margin-right: 5px;
    font-size: 1em;
    line-height: 1;
`;

const CurrentLangText = styled.span`
    line-height: 1;
`;

const DropdownArrow = styled.svg`
    transition: transform 0.2s ease-in-out;
    fill: #131313;
    margin-left: 5px;
    transform: ${props => (props.$isExpanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const LanguageDropdown = styled.ul`
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%) ${props => (props.$isHidden ? 'translateY(-10px)' : 'translateY(0)')};
    background-color: #fcf8f8;
    border: 1px solid #f3f2f2;
    border-radius: 6px;
    list-style: none;
    padding: 6px 0;
    margin: 0;
    z-index: 1050;
    min-width: 160px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.4);
    opacity: ${props => (props.$isHidden ? 0 : 1)};
    visibility: ${props => (props.$isHidden ? 'hidden' : 'visible')};
    transform-origin: top center;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out, transform 0.2s ease-in-out;
`;

const LanguageDropdownLi = styled.li`
    padding: 10px 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #000;
    font-size: 14px;
    font-weight: 400;
    font-family: "PP Neue Montreal", sans-serif;

    &:hover,
    &:focus {
        background-color: #333;
        color: #fff;
        outline: none;
    }

    .lang-flag {
        margin-right: 8px;
        font-size: 1.1em;
    }
    .lang-text {
        flex-grow: 1;
    }
`;
// --- Koniec Styled-Components ---

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [currentLangCode, setCurrentLangCode] = useState('en');
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    ];

    const getLangDetails = useCallback((code) => {
        return languages.find(lang => lang.code === code) || languages[0];
    }, []);

    useEffect(() => {
        const storedLang = localStorage.getItem('preferredLang') || 'en';
        const initialLang = getLangDetails(storedLang);
        setCurrentLangCode(initialLang.code);
        i18n.changeLanguage(initialLang.code);
        document.documentElement.lang = initialLang.code;
    }, [i18n, getLangDetails]);

    const toggleDropdown = () => setIsOpen(prev => !prev);

    const handleSelectLanguage = (langCode) => {
        setCurrentLangCode(langCode);
        localStorage.setItem('preferredLang', langCode);
        i18n.changeLanguage(langCode);
        document.documentElement.lang = langCode;
        setIsOpen(false);
        buttonRef.current?.focus();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = useCallback((event) => {
        const items = Array.from(dropdownRef.current?.querySelectorAll('li[role="option"]') || []);
        if (items.length === 0) return;

        const activeElement = document.activeElement;
        let currentIndex = items.indexOf(activeElement);

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].focus();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            items[currentIndex].focus();
        } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (activeElement && activeElement.hasAttribute('data-lang')) {
                const langCode = activeElement.getAttribute('data-lang');
                handleSelectLanguage(langCode);
            }
        } else if (event.key === 'Escape') {
            event.preventDefault();
            setIsOpen(false);
            buttonRef.current?.focus();
        } else if (event.key === 'Tab' && !isOpen) {
            return;
        } else if (event.key === 'Tab' && isOpen) {
            setIsOpen(false);
        }
    }, [isOpen, handleSelectLanguage]);

    useEffect(() => {
        if (isOpen) {
            dropdownRef.current?.addEventListener('keydown', handleKeyDown);
        } else {
            dropdownRef.current?.removeEventListener('keydown', handleKeyDown);
        }
        return () => {
            dropdownRef.current?.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);


    const currentLangDetails = getLangDetails(currentLangCode);

    return (
        <SelectorContainer>
            <LanguageSelectorStyled>
                <LanguageSelectorButton
                    ref={buttonRef}
                    onClick={toggleDropdown}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                >
                    <CurrentLangFlag>{currentLangDetails.flag}</CurrentLangFlag>
                    <CurrentLangText>{currentLangDetails.name}</CurrentLangText>
                    <DropdownArrow $isExpanded={isOpen} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 10l5 5 5-5H7z"/>
                    </DropdownArrow>
                </LanguageSelectorButton>
                <LanguageDropdown ref={dropdownRef} role="listbox" aria-hidden={!isOpen} $isHidden={!isOpen}>
                    {languages.map(lang => (
                        <LanguageDropdownLi
                            key={lang.code}
                            role="option"
                            data-lang={lang.code}
                            tabIndex={isOpen ? 0 : -1}
                            onClick={() => handleSelectLanguage(lang.code)}
                        >
                            <span className="lang-flag">{lang.flag}</span>
                            <span className="lang-text">{lang.name}</span>
                        </LanguageDropdownLi>
                    ))}
                </LanguageDropdown>
            </LanguageSelectorStyled>
        </SelectorContainer>
    );
};

export default LanguageSelector;