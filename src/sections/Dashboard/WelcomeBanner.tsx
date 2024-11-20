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
  max-width: 800px;
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
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
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
  gap: 15px;
  margin-top: 20px;

  & > button {
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    background: #ffffffdf;
    transition: background-color 0.2s ease;
    color: black;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background: white;
    }
  }
`

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
        <button onClick={copyInvite}>💸 SOON</button>
        <button onClick={() => window.open('', '_blank')}>🚀 SOON</button>
        <button onClick={() => window.open('https://discord.gg/', '_blank')}>💬 SOON</button>
      </Buttons>
    </WelcomeContainer>
  )
}