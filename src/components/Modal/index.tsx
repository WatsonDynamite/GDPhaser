import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

type ModalProps = {
  isOpen: boolean
  onClose: Function
}

export default function Modal({ isOpen, onClose, children }: PropsWithChildren<ModalProps>) {
  if (!isOpen) return null
  return (
    <ModalBackdrop onClick={() => onClose()}>
      <ModalContent
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        {children}
      </ModalContent>
    </ModalBackdrop>
  )
}

const ModalBackdrop = styled.div`
  background-color: rgba(47, 47, 47, 0.49);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 4;
  cursor: pointer;
`

const ModalContent = styled.div`
  background-color: lightgray;
  border: 2px solid darkgray;
  border-radius: 10px;
  padding: 10px;
  cursor: initial;
  display: flex;
  flex-direction: column;
  align-items: center;
`
