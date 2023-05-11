import React from 'react'
import FullScreenContainerDiv from '../FullScreenContainer'
import styled from 'styled-components'
import dirt from '../../assets/materials/dirt.jpg'
import CustomEventDispatcher, { CustomEvents } from '../../scripts/behaviors/CustomEventDispatcher'
import { AiFillPlusCircle } from 'react-icons/ai'
import { RotatingLines } from 'react-loader-spinner'
import { loadTeams } from './utils'
import { Team } from '../../scripts/definitions/team'
import TeamItem from './partials/TeamItem'

function Teambuilder() {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [teams, setTeams] = React.useState<Team[]>()

  React.useEffect(() => {
    const teams = loadTeams(() => {
      setLoading(false)
    })
    if (teams) {
      setTeams(teams)
    }
  }, [])

  return (
    <FullScreenContainerDiv style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Background></Background>
      <BackButton onClick={() => CustomEventDispatcher.getInstance().emit(CustomEvents.INIT_TITLE_SCREEN)}>
        {'<< Back'}
      </BackButton>
      <Grid>
        <h3 style={{ margin: 0, gridRow: 1, gridColumn: 1, verticalAlign: 'middle' }}>Teambuilder</h3>
        <RoundedContainer style={{ gridRow: '2' }}>
          <TeamContainer>
            {loading ? (
              <RotatingLines strokeColor="gray" />
            ) : (
              <React.Fragment>
                {teams?.map((team) => (
                  <TeamItem key={team.name} team={team} />
                ))}
                <AddButton>
                  <AiFillPlusCircle style={{ fill: 'white', width: '40px', height: '40px' }} />
                </AddButton>
              </React.Fragment>
            )}
          </TeamContainer>
        </RoundedContainer>
        <LoadFromCodeButton style={{ gridColumn: '2', gridRow: '1' }}>Load from code</LoadFromCodeButton>
        <RoundedContainer style={{ gridColumn: '2', gridRow: '2' }}>
          <p style={{ color: 'white', fontSize: '1.2rem' }}>
            This is the teambuilder where you can manage your Grimdrive teams.
            <br />
            Existing teams will be listed on the left side of the screen. In order to use a team in battles, it must
            have a total of 6 monsters. Unfinished teams will be grayed out and will not be able to be selected in
            battles.
            <br />
            Click the "+" button on the team list to begin creating a new team from scratch. Click the different buttons
            on an existing team to edit, duplicate, export or delete a team.
            <br />
            Click the "Load from code" button to import a team via an exported code. Use this to share teams or move
            them between devices!
          </p>
        </RoundedContainer>
      </Grid>
    </FullScreenContainerDiv>
  )
}

export default Teambuilder

const Grid = styled.div`
  display: grid;
  height: 80%;
  width: 90%;
  max-width: 1500px;
  grid-template-columns: 70% 20%;
  row-gap: 5%;
  column-gap: 2%;
  grid-template-rows: 10% 70%;
  padding: 1%;

  > h3 {
    grid-row: 1;
    grid-column: 1 / span 2;
    font-size: 3rem;
    color: white;
    padding: none;
  }
`

const TeamContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 10px;
`

const AddButton = styled.button`
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  background: none;
  border: none;
  height: 45px;
  width: 45px;
`

const LoadFromCodeButton = styled.button`
  font-size: 2rem;
  border: 2px solid darkgray;
  border-radius: 10px;
`

const RoundedContainer = styled.div`
  background-color: rgba(47, 47, 47, 0.49);
  border: 2px solid darkgray;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
`

const BackButton = styled.button`
  position: absolute;
  top: 1%;
  left: 1%;
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
`

const Background = styled.div`
  width: inherit;
  height: inherit;
  overflow: hidden;
  position: absolute;
  background: url(${dirt});
`
