import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation('footer')

  return (
    <Container>
      <Content>
        <Section>
          <h4>{t('company')}</h4>
          <ul>
            <li>{t('about')}</li>
            <li>{t('careers')}</li>
            <li>{t('press')}</li>
          </ul>
        </Section>
        <Section>
          <h4>{t('support')}</h4>
          <ul>
            <li>{t('contact')}</li>
            <li>{t('faq')}</li>
            <li>{t('returns')}</li>
          </ul>
        </Section>
        <Section>
          <h4>{t('follow_us')}</h4>
          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Twitter</li>
          </ul>
        </Section>
      </Content>
      <Copy>{t('copyright')}</Copy>
    </Container>
  )
}

export default Footer

// STYLES

const Container = styled.footer`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`

const Section = styled.div`
  flex: 1 1 150px;
  margin: 1rem 0;

  h4 {
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.25rem;
    }
  }
`

const Copy = styled.p`
  text-align: center;
  font-size: 0.9rem;
`
