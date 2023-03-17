import React from 'react'
import styled from 'styled-components'

export default function Chat() {
  return (
    <ChatContainer>
      <Content />
      <Chatbox>
        <input />
        <button>Send</button>
      </Chatbox>
    </ChatContainer>
  )
}

const ChatContainer = styled.div`
  height: 95vh;
  padding: 0 0.4%;
  width: 250px;
  position: absolute;
  background-color: grey;
  border-radius: 10px;
  border: 2px solid lightgrey;
  right: 2vw;
  top: 2vh;
`

const Content = styled.div`
  height: 95%;
`

const Chatbox = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
`
