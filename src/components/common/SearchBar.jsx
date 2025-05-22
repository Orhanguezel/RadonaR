// src/components/common/SearchBar.jsx
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const SearchContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const SearchInput = styled.input`
    padding: 10px 10px 10px 40px;
    border: 1px solid #ccc;
    border-radius: 40px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
    cursor: pointer;
    background-color: #fff;
    color: #000;

    &::placeholder {
        color: #555;
    }

    &:focus {
        border-color: #000;
    }
`;

const SearchIcon = styled.i`
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #000;
    pointer-events: none;
`;

const SearchBar = () => {
    const { t } = useTranslation('navbar');

    return (
        <SearchContainer>
            <SearchInput type="text" placeholder={t('searchPlaceholder')} />
            <SearchIcon className="fas fa-search"></SearchIcon>
        </SearchContainer>
    );
};

export default SearchBar;