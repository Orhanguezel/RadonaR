import React from 'react'
import { useParams } from 'react-router-dom'
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

const ProductDetail = () => {
  const { id } = useParams()
  const { t } = useTranslation('products')

  return (
    <Container>
      <Title>{t('detail_title', { id })}</Title>
      <Description>{t('detail_description')}</Description>
      <button disabled>{t('add_to_cart_disabled')}</button>
    </Container>
  )
}

export default ProductDetail
