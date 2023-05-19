import React from 'react'
import styled from 'styled-components'
import FullScreenContainerDiv from '../FullScreenContainer'
import TabsContainer from './partials/TabsContainer'
import { Team } from '../../scripts/definitions/team'
import BuildTab from './partials/BuildTab'

type TeamEditorProps = {
  edit?: {
    team: Team
    idx: number
  }
}

export default function TeamEditor({ edit }: TeamEditorProps) {
  const tabsContent = [
    {
      title: 'Build',
      child: <BuildTab edit={edit} />
    },
    {
      title: 'Offense',
      child: <div />
    },
    {
      title: 'Defense',
      child: <div />
    },
    {
      title: 'Damage',
      child: <div />
    }
  ]

  return (
    <FullScreenContainerDiv>
      <Container>
        <TabsContainer content={tabsContent}></TabsContainer>
      </Container>
    </FullScreenContainerDiv>
  )
}

const Container = styled.div`
  margin: 5%;
`
