import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Cart = () => {
  const { t } = useTranslation('cart')

  return (
    <Container>
      <Title>{t('title')}</Title>
      <EmptyMessage>{t('empty_message')}</EmptyMessage>
    </Container>
  )
}

export default Cart

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

const EmptyMessage = styled.p`
  font-size: 1.2rem;
`
