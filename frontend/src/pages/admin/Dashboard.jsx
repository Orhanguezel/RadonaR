import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Dashboard = () => {
  const { t } = useTranslation('admin')

  return (
    <Container>
      <Title>{t('dashboard_title')}</Title>
      <StatsGrid>
        <StatCard>
          <h3>{t('users')}</h3>
          <p>120</p>
        </StatCard>
        <StatCard>
          <h3>{t('orders')}</h3>
          <p>45</p>
        </StatCard>
        <StatCard>
          <h3>{t('products')}</h3>
          <p>78</p>
        </StatCard>
      </StatsGrid>
    </Container>
  )
}

export default Dashboard

// STYLES

const Container = styled.div`
  padding: 2rem;
  min-height: 80vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.body};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.8rem;
    font-weight: bold;
  }
`
