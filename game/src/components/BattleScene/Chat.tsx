import React, { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import styled from 'styled-components'

type ChatProps = {
  socketClient: Socket
}

type Message = {
  user: string
  message: string
}

export default function Chat({ socketClient }: ChatProps) {
  const [input, setInput] = React.useState('')
  const [messages, setMessages] = React.useState<Message[]>([])

  function handleSendMessage() {
    socketClient.emit('chatMessage', { user: socketClient.auth['username'], message: input })
    setInput('')
  }

  socketClient.on('loadChatHistory', (data) => {
    setMessages([...data])
  })

  useEffect(() => {
    socketClient.on('chatMessage', (data: Message) => {
      setMessages((old) => {
        const newMsgs = [...old]
        newMsgs.push(data)
        return newMsgs
      })
    })
  }, [socketClient])

  return (
    <ChatContainer>
      <Content>
        {messages.map((msg: Message, idx) => {
          return (
            <div key={`${msg.user} - ${idx}`}>
              {msg.user}: {msg.message}
            </div>
          )
        })}
      </Content>
      <Chatbox>
        <input value={input} onChange={(e) => setInput(e.currentTarget.value)} />
        <button onClick={() => handleSendMessage()}>Send</button>
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
  padding-top: 15px;
`

const Chatbox = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
`
