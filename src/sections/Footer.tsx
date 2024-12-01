import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: linear-gradient(180deg, #212233, #14151f);
  color: white;
  font-size: 14px;
  text-align: center;
  width: 100%;
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.3);
`

const FooterTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const FooterLogo = styled.div`
  display: flex;
  align-items: center;

  & > img {
    height: 40px;
    margin-right: 10px;
  }
`

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;

  & a {
    color: #03ffa4;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
      color: white;
      text-shadow: 0 0 5px #03ffa4;
    }
  }
`

const ContactInfo = styled.div`
  font-size: 12px;
  margin-top: 10px;
  color: #aaa;

  & a {
    color: #03ffa4;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
      color: white;
      text-shadow: 0 0 5px #03ffa4;
    }
  }
`

const FooterBottom = styled.div`
  margin-top: 20px;
  font-size: 12px;
  color: #666;
`

export default function Footer() {
  return (
    <FooterContainer>
      <FooterTop>
        <FooterLogo>
          <img src="/logo.svg" alt="Logo" />
        </FooterLogo>
        <FooterLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/website">Website</NavLink>
          <NavLink to="/https://x.com/Solplaycasino">Twitter | 𝕏</NavLink>
        </FooterLinks>
      </FooterTop>
      <ContactInfo>
        Contact us at: <a href="mailto:contact@solplay.casino">contact@solplay.casino</a>
      </ContactInfo>
      <FooterBottom>
        Made with ❤️ by the Solplay team.
      </FooterBottom>
    </FooterContainer>
  )
}
