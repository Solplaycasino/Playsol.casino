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
  background: rgba(255, 255, 255, 0.7);
  border: none;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: none;
  }

  &::before {
    content: ''; /* Ok işareti */
    display: block;
    border: solid black;
    border-width: 0 3px 3px 0;
    padding: 5px;
    transform: rotate(${(props) => (props.direction === 'left' ? '135deg' : '-45deg')});
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 15px;
`;

const RightArrow = styled(ArrowButton)`
  right: 15px;
`;


const LeftArrow = styled(ArrowButton)`
  left: 15px;
  &::before {
    content: '\\276E';
  }
`;

const RightArrow = styled(ArrowButton)`
  right: 15px;
  &::before {
    content: '\\276F';
  }
`;

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
    border-radius: 50px;
    padding: 12px 25px;
    background: linear-gradient(45deg, #ff7e5f, #feb47b);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
      background: linear-gradient(45deg, #feb47b, #ff7e5f);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 126, 95, 0.5);
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
        <button onClick={copyInvite}>💸 SOON</button>
        <button onClick={() => window.open('', '_blank')}>🚀 SOON</button>
        <button onClick={() => window.open('https://discord.gg/', '_blank')}>💬 SOON</button>
      </Buttons>
    </WelcomeContainer>
  )
}
