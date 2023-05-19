import store from 'store'
import { Team } from '../../scripts/definitions/team'
import { InstanceMonsterFromID, monsterList } from '../../scripts/data/monsterList'

export function addTeam(teamCode: string) {
  try {
    decryptTeam(teamCode)
    let teamCodeEscaped = teamCode.replaceAll(/;/g, '')
    let teamStore: string = store.get('teams', '')
    teamStore += `${teamCodeEscaped};`

    store.set('teams', teamStore)
  } catch (err) {
    console.error(err)
  }
}

export function editTeam(teamCode: string, idx: number) {
  try {
    decryptTeam(teamCode)
    const teamCodeEscaped = teamCode.replaceAll(/;/g, '')
    const teamStore: string = store.get('teams', '')
    const teamStrArr = teamStore.split(';')
    teamStrArr.pop()
    teamStrArr[idx] = teamCodeEscaped
    const newTeamArr = teamStrArr.map((el) => `${el};`).join('')

    store.set('teams', newTeamArr)
  } catch (err) {
    console.error(err)
  }
}

/**
 * character separators:
 * ":" (colon) -> separates the team name from the team data
 * "+" (plus) -> separates the different aspects of a team member, in order: species, item and nickname
 * "/" (slash) -> separates individual team members
 * ";" (semicolon) -> determines the end of a team
 */
export function loadTeams(callback: Function) {
  const teamStore: string | null = store.get('teams', null)

  try {
    if (teamStore) {
      const teamStrs = teamStore.split(';')
      teamStrs.pop()
      const teamsToReturn = teamStrs.map((team) => decryptTeam(team))

      return teamsToReturn
    }
  } catch (err) {
    console.error(err)
    return []
  } finally {
    callback()
  }
}

export function decryptTeam(team: string): Team {
  const [teamName, monsters] = team.split(':') //team name separator
  const monsterObjs = monsters.split('/').map((monStr) => {
    //item does nothing atm
    const [speciesId, itemId, nickname] = monStr.split('+')
    const monsterData = InstanceMonsterFromID(speciesId)
    //TODO: add item
    if (nickname !== '') {
      monsterData.setNickname(decodeURI(nickname))
    }
    return monsterData
  })

  return new Team(decodeURI(teamName), monsterObjs)
}

export function encryptTeam(team: Team): string {
  let teamString = ''
  teamString += `${encodeURIComponent(team.name)}:`
  team.monsters.map((mon, idx) => {
    const monId = mon.id
    //TODO: add check for itemID
    const itemId = 'N'
    const monNickname = mon.getNickname()
    const nick = monNickname ? encodeURIComponent(monNickname) : ''

    teamString += `${monId}+${itemId}+${nick}`
    if (idx !== team.monsters.length - 1) {
      teamString += '/'
    }
  })
  teamString += ';'
  return teamString
}
