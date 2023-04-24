import React from 'react'
import styled from 'styled-components'
import FullScreenContainerDiv from '../FullScreenContainer'
import ReactAnimatedEllipsis from 'react-animated-ellipsis'

export default function WaitingForPlayers({}) {
  console.log('waiting for players')

  return (
    <FullScreenContainerDiv>
      <ScreenContents>
        <div>
          <Loading />
        </div>
      </ScreenContents>
    </FullScreenContainerDiv>
  )
}

const ScreenContents = styled.div`
  width: inherit;
  height: inherit;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(200, 200, 200, 0.9);

  font-size: 2rem;
  color: white;

  > div {
    display: block;
    margin-bottom: 10%;
  }
`

const Loading = styled.div`
  ::after {
    display: inline-block;
    animation: dotty steps(1, end) 1s infinite;
    content: 'Waiting for Players';
  }

  @keyframes dotty {
    0% {
      content: 'Waiting for Players';
    }
    25% {
      content: 'Waiting for Players.';
    }
    50% {
      content: 'Waiting for Players..';
    }
    75% {
      content: 'Waiting for Players...';
    }
    100% {
      content: 'Waiting for Players';
    }
  }
`
