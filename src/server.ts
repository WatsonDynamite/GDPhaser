import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { TurnActionMoveDTO } from './scripts/definitions/turnAction'
import { Message, GameState, PendingState } from './scripts/definitions/serverPayloads'
import { SocketEvents } from './scripts/definitions/enums'
import { TurnActionDTO } from './scripts/definitions/TurnActions/TurnAction'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})
const chat: Message[] = []

const gameState: GameState = {
  player1: null,
  player2: null,
  field: {
    player1grid: [],
    player2grid: []
  }
}

const pendingState: PendingState = {
  player1TurnActions: [],
  player2TurnActions: []
}

server.listen(3002, () => {
  console.log('listening on *:3002')
})

//everything done inside io.[thing] is global
//everything done inside socket.[thing] is specific to that connection

io.on('connection', (socket) => {
  console.log(`User ${socket.handshake.auth.username} has connected.`)
  const joinMsg = {
    user: '[SERVER]',
    message: `User ${socket.handshake.auth.username} has connected.`
  }
  chat.push(joinMsg)
  io.emit(SocketEvents.CHAT_MESSAGE, joinMsg)

  //check if there already is a player 1, if so, set current user to player 1, if not, set to player 2,
  //if there already are 2 players, everyone else is a spectator
  if (!gameState.player1) {
    console.log('watch out')
    gameState.player1 = socket.id
    socket.on(SocketEvents.INIT_DATA, (data) => {
      const { grid } = data
      console.log(grid)
      gameState.field.player1grid = grid
      socket.emit(SocketEvents.YOU_ARE, 1)
      console.log('found a player 1')
    })
  } else if (!gameState.player2) {
    gameState.player2 = socket.id
    socket.on(SocketEvents.INIT_DATA, (data) => {
      const { grid } = data
      console.log(grid)
      gameState.field.player2grid = grid
      socket.emit(SocketEvents.YOU_ARE, 2)
      console.log('found a player 2')

      //two players connected, game ready

      setTimeout(() => {
        io.emit(SocketEvents.GAME_READY)
      }, 400)
    })
  } else {
    //spectators
  }

  setTimeout(() => {
    socket.emit(SocketEvents.LOAD_CHAT_HISTORY, chat)
    io.emit(SocketEvents.REFRESH_GAME_STATE, gameState)
  }, 400)

  socket.on(SocketEvents.CHAT_MESSAGE, (data) => {
    chat.push(data)
    io.emit(SocketEvents.CHAT_MESSAGE, data)
  })

  socket.on(SocketEvents.DISCONNECT, () => {
    console.log(`User ${socket.handshake.auth.username} has disconnected.`)
    if (socket.id === gameState.player1) {
      gameState.player1 = null
      gameState.field.player1grid = []
      io.emit('gameNotReady')
    }
    if (socket.id === gameState.player2) {
      gameState.player2 = null
      gameState.field.player2grid = []
      io.emit('gameNotReady')
    }
    setTimeout(() => {
      io.emit(SocketEvents.CHAT_MESSAGE, {
        user: '[SERVER]',
        message: `User ${socket.handshake.auth.username} has disconnected.`
      })
    })
  })

  socket.on(SocketEvents.SEND_TURN_ACTIONS, (turnActs) => {
    if (turnActs) {
      console.log(turnActs)
      try {
        if (socket.id === gameState.player1) {
          pendingState.player1TurnActions = turnActs
        } else if (socket.id === gameState.player2) {
          pendingState.player2TurnActions = turnActs
        }

        if (pendingState.player1TurnActions.length > 0 && pendingState.player2TurnActions.length > 0) {
          const turnActsList = [...pendingState.player1TurnActions, ...pendingState.player2TurnActions]

          turnActsList.sort((a: TurnActionDTO, b: TurnActionDTO) => {
            const priorityA = a.priorityCalc
            const priorityB = b.priorityCalc
            if (priorityA - priorityB === 0) {
              const decisionInt = Math.random()
              if (decisionInt < 0.5) {
                return -1
              } else {
                return 1
              }
            }
            return priorityA - priorityB
          })
          io.emit(SocketEvents.TURNS_READY, turnActsList)
        }
      } catch (err) {
        console.log(err)
      }
    }
  })
})
