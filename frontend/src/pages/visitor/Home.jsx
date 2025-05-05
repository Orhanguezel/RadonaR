import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const Container = styled.div`
  padding: 2rem;
  min-height: 80vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`

const Description = styled.p`
  font-size: 1.2rem;
`

const Home = () => {
  const { t } = useTranslation('home')

  return (
    <Container>
      <Title>{t('welcome')}</Title>
      <Description>{t('description')}</Description>
    </Container>
  )
}

export default Home
