import React from 'react'
import styled from 'styled-components'

type MovePlateProps = {
  text: string | null
}

export default function MovePlate({ text }: MovePlateProps) {
  return text ? <MovePlateContainer>{text}</MovePlateContainer> : null
}

const MovePlateContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  width: auto;
  top: 5%;
  right: 50%;
  z-index: 2;
  background-color: lightGray;
  border: 8px solid gray;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  color: white;
  font-size: 1.5rem;
`
