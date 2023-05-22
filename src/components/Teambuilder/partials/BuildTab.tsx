import styled from 'styled-components'
import { AiFillSave } from 'react-icons/ai'
import { Team } from '../../../scripts/definitions/team'
import React from 'react'
import { Monster } from '../../../scripts/definitions/monster'
import TeamSlot from './buildTab/TeamSlot'
import { monsterList } from '../../../scripts/data/monsterList'
import MonsterListItem from './buildTab/MonsterListItem'
import Modal from '../../Modal'
import { addTeam, editTeam, encryptTeam } from '../utils'
import CustomEventDispatcher, { CustomEvents } from '../../../scripts/behaviors/CustomEventDispatcher'
import NicknameForm from './buildTab/NicknameForm'
import MonsterDetails from './buildTab/MonsterDetails'

type BuildTabProps = {
  edit?: {
    team: Team
    idx: number
  }
}

export default function BuildTab({ edit }: BuildTabProps) {
  const [teamName, setTeamName] = React.useState<string>(edit?.team.name ?? '')
  const [monstersInTeam, setMonstersInTeam] = React.useState<Array<Monster | null>>(
    edit?.team.monsters ?? [null, null, null, null, null, null]
  )
  const [selectedSlot, setSelectedSlot] = React.useState<number>(0)
  const [isErrorModalOpen, setErrorModalOpen] = React.useState<string | null>(null)

  const selectedMonster = monstersInTeam[selectedSlot]

  function addMonster(mon) {
    const newMonsInTeam = [...monstersInTeam]
    newMonsInTeam[selectedSlot] = mon
    setMonstersInTeam(newMonsInTeam)
  }

  function onMove(index: number, dir: 'left' | 'right') {
    const newMonsInTeam = [...monstersInTeam]

    if (dir === 'left' && index > 0 && index < newMonsInTeam.length) {
      const temp = newMonsInTeam[index - 1]
      newMonsInTeam[index - 1] = newMonsInTeam[index]
      newMonsInTeam[index] = temp
    } else if (dir === 'right' && index >= 0 && index < newMonsInTeam.length - 1) {
      const temp = newMonsInTeam[index + 1]
      newMonsInTeam[index + 1] = newMonsInTeam[index]
      newMonsInTeam[index] = temp
    }

    setMonstersInTeam(newMonsInTeam)
  }

  function renderMonsterItems() {
    let items: Array<JSX.Element> = []
    for (let i = 0; i < 6; i++) {
      items.push(
        <React.Fragment key={`teamSlot-${i}`}>
          <TeamSlot
            listkey={`teamSlot-${i}`}
            idx={i}
            monster={monstersInTeam[i]}
            selected={selectedSlot === i}
            setSelected={() => setSelectedSlot(i)}
            onMoveLeft={() => onMove(i, 'left')}
            onMoveRight={() => onMove(i, 'right')}
            canMoveLeft={!!monstersInTeam[i - 1] && !!monstersInTeam[i]}
            canMoveRight={!!monstersInTeam[i + 1] && !!monstersInTeam[i]}
          />
        </React.Fragment>
      )
    }
    return items
  }

  function renderMonsterList() {
    const list: Array<JSX.Element> = []

    monsterList.forEach((mon) => {
      const isSelected = monstersInTeam.find((listMon) => mon.id === listMon?.id)
      list.push(
        <React.Fragment key={`monlist-${mon.name}`}>
          <MonsterListItem
            monster={mon}
            listkey={`monlist-${mon.name}`}
            onClick={() => addMonster(mon)}
            isSelected={!!isSelected}
          />
        </React.Fragment>
      )
    })
    return list
  }

  function validateAndSave(setErrorModalOpen: Function) {
    const issues: Array<JSX.Element> = []
    if (!teamName || teamName.trim() === '') {
      issues.push(<p>Your team's name is invalid.</p>)
    }
    if (!monstersInTeam || !monstersInTeam.filter((el) => el).length) {
      issues.push(<p>Your team has no monsters.</p>)
    }

    if (issues.length) {
      setErrorModalOpen(issues)
    } else {
      const monstersWithoutNulls: Array<Monster> = monstersInTeam.filter((el) => !!el) as Array<Monster>
      const teamToAdd = new Team(teamName, monstersWithoutNulls!)

      if (edit) {
        editTeam(encryptTeam(teamToAdd), edit.idx)
      } else {
        addTeam(encryptTeam(teamToAdd))
      }

      CustomEventDispatcher.getInstance().emit(CustomEvents.INIT_TEAMBUILDER)
    }
  }

  return (
    <Container>
      <UIContainer>
        <Modal isOpen={!!isErrorModalOpen} onClose={() => setErrorModalOpen(null)}>
          <p>There are issues with this team:</p>
          <div>{isErrorModalOpen}</div>
        </Modal>
        <Row>
          <TeamNameInput maxLength={32} value={teamName} onChange={(e) => setTeamName(e.currentTarget.value)} />
          <button style={{ height: '40px' }} onClick={() => validateAndSave(setErrorModalOpen)}>
            <AiFillSave width={40} height={40} />
          </button>
        </Row>
        <Row style={{ height: '164px' }}>
          <TeamMonsters>{renderMonsterItems()}</TeamMonsters>
          {selectedMonster && (
            <NicknameForm monster={selectedMonster} onSaveNickname={(monster: Monster) => addMonster(monster)} />
          )}
        </Row>
        <MonsterTable>
          <div></div>
          <div>{renderMonsterList()}</div>
        </MonsterTable>
      </UIContainer>
      <DetailsContainer>{selectedMonster && <MonsterDetails monster={selectedMonster} />}</DetailsContainer>
    </Container>
  )
}

const TeamNameInput = styled.input`
  font-size: 2.5rem;
  margin-bottom: 15px;
  width: min-content;
`

const Row = styled.div`
  width: 98%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MonsterTable = styled.div`
  margin-top: 15px;
  padding: 10px;
  border: 2px solid darkgray;
  border-radius: 10px;
  overflow-y: scroll;

  > thead {
    > tr {
      > th {
        width: min-content;
      }
    }
  }
`

const Container = styled.div`
  height: 71vh;
  background: lightgray;
  display: flex;
  flex-gap: 5px;
  padding: 15px;
`

const UIContainer = styled.div`
  width: 75%;
  height: inherit;
  background: lightgray;
  display: flex;
  flex-direction: column;
  flex-gap: 5px;
  padding: 15px;
`

const DetailsContainer = styled.div`
  width: 22%;
  background-color: gray;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 2px solid darkgray;
  border-radius: 10px;
  overflow-y: scroll;
`

const TeamMonsters = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 20px;
`
