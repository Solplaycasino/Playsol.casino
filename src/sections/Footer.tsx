import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: rgba(33, 34, 51, 0.9);
  color: white;
  font-size: 14px;
  text-align: center;
  width: 100%;
`

const FooterTop = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  justify-content: space-between;
  align-items: center;
`

const FooterLogo = styled.div`
  display: flex;
  align-items: center;

  & > img {
    height: 30px;
    margin-right: 10px;
  }
`

const FooterLinks = styled.div`
  display: flex;
  gap: 15px;

  & a {
    color: #03ffa4;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.2s;

    &:hover {
      color: white;
    }
  }
`

const FooterBottom = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #999;
`

export default function Footer() {
  return (
    <FooterContainer>
      <FooterTop>
        <FooterLogo>
          <img src="/logo.svg" alt="Logo" />
        </FooterLogo>
        <FooterLinks>
          <NavLink to="/">X</NavLink>
          <NavLink to="/website">Website</NavLink>
          <NavLink to="/buy-token">Buy Token</NavLink>
        </FooterLinks>
      </FooterTop>
      <FooterBottom>
        Made with love by _
      </FooterBottom>
    </FooterContainer>
  )
}