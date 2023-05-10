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
          const messageMap = msg.message.split('\n')
          return (
            <div key={`chat-${idx}`}>
              {msg.user ? `${msg.user}: ` : ''}
              {messageMap.map((el, idx2) => (
                <React.Fragment key={`chat-${idx}-line${idx2}`}>
                  {el}
                  {idx2 !== messageMap.length - 1 && <br />}
                </React.Fragment>
              ))}
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
