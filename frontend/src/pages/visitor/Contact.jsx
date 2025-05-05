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

const Content = styled.p`
  font-size: 1.2rem;
`

const Contact = () => {
  const { t } = useTranslation('common')

  return (
    <Container>
      <Title>{t('contact_title')}</Title>
      <Content>{t('contact_content')}</Content>
    </Container>
  )
}

export default Contact
