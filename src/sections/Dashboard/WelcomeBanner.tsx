import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useUserStore } from '../../hooks/useUserStore'

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Welcome = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06));
  height: 300px;
  width: 100%;
  max-width: 900px;
  margin-bottom: 20px;
`

const BannerImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s ease-in-out;
  opacity: ${(props) => (props.isActive ? 1 : 0)};
`

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 15px;
  font-size: 30px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`

const LeftArrow = styled(ArrowButton)`
  left: 10px;
`

const RightArrow = styled(ArrowButton)`
  right: 10px;
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`

const ModernButton = styled.button`
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(45deg, #ff5f6d, #ffc371);
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(255, 95, 109, 0.3);
  }

  &:active {
    filter: brightness(1.2);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:before {
    opacity: 1;
    animation: glow 1s linear infinite;
  }

  @keyframes glow {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export function WelcomeBanner() {
  const wallet = useWallet()
  const walletModal = useWalletModal()
  const store = useUserStore()
  
  const [currentImage, setCurrentImage] = useState(0)
  const images = ['/banner1.png', '/banner2.png']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000) // Change image every 5 seconds
    return () => clearInterval(interval)
  }, [images.length])

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const copyInvite = () => {
    store.set({ userModal: true })
    if (!wallet.connected) {
      walletModal.setVisible(true)
    }
  }

  return (
    <WelcomeContainer>
      <Welcome>
        {images.map((src, index) => (
          <BannerImage key={index} src={src} isActive={index === currentImage} />
        ))}
        <LeftArrow onClick={handlePrevImage}>&#9664;</LeftArrow>
        <RightArrow onClick={handleNextImage}>&#9654;</RightArrow>
      </Welcome>
      <Buttons>
        <ModernButton onClick={copyInvite}>
          💸 Connect Wallet
        </ModernButton>
        <ModernButton onClick={() => window.open('', '_blank')}>
          🚀 Launch
        </ModernButton>
        <ModernButton onClick={() => window.open('https://discord.gg/', '_blank')}>
          💬 Join Discord
        </ModernButton>
      </Buttons>
    </WelcomeContainer>
  )
}
