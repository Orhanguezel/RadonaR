import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Account = () => {
  const { t } = useTranslation('common')

  return (
    <Container>
      <Title>{t('account_title')}</Title>
      <Content>{t('account_content')}</Content>
    </Container>
  )
}

export default Account

// STYLES

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
