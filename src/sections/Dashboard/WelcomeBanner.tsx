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

// Sol ve Sağ Oklar (Çentikler) - Banner İçinde
const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
  z-index: 10;
  transition: color 0.3s ease;

  &:hover {
    color: #ff5f6d; /* Hoverda renk değişimi */
  }

  &:focus {
    outline: none;
  }
`

const LeftArrow = styled(ArrowButton)`
  left: 10px; /* Banner içine yerleştirilen sol ok */
`

const RightArrow = styled(ArrowButton)`
  right: 10px; /* Banner içine yerleştirilen sağ ok */
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`

const ModernButton = styled.button`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  background: transparent;
  color: #fff;
  border: 2px solid #ff5f6d;
  border-radius: 30px;
  cursor: pointer;
  outline: none;
  position: relative;
  transition: all 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #ff5f6d;
    color: #fff;
    transform: translateY(-3px);
  }

  &:active {
    background: #ffc371;
    color: #fff;
    transform: translateY(1px);
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
        <LeftArrow onClick={handlePrevImage}>❮</LeftArrow>  {/* Sol ok simgesi */}
        <RightArrow onClick={handleNextImage}>❯</RightArrow> {/* Sağ ok simgesi */}
      </Welcome>
      <Buttons>
        <ModernButton onClick={copyInvite}>
          💸 Invite Earn a 0.25% fee
        </ModernButton>
        <ModernButton onClick={() => window.open('https://x.com/Solplaycasino', '_blank')}>
          💬 Twitter | 𝕏 
        </ModernButton>
       <ModernButton onClick={() => window.open('https://t.me/solplaycasino', '_blank')}>
          💬 Telegram 
        </ModernButton>
        
      </Buttons>
    </WelcomeContainer>
  )
}
