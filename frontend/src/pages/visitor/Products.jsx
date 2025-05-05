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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`

const ProductCard = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  text-align: center;
  background: ${({ theme }) => theme.colors.body};
`

const Products = () => {
  const { t } = useTranslation('products')

  // Temporary mock data
  const productList = [
    { id: 1, name: 'Mountain Bike' },
    { id: 2, name: 'Road Bike' },
    { id: 3, name: 'Hybrid Bike' },
    { id: 4, name: 'Electric Bike' },
  ]

  return (
    <Container>
      <Title>{t('title')}</Title>
      <ProductGrid>
        {productList.map((product) => (
          <ProductCard key={product.id}>
            <p>{product.name}</p>
            <button disabled>{t('add_to_cart_disabled')}</button>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  )
}

export default Products
