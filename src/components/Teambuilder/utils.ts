import store from 'store'
import { Team } from '../../scripts/definitions/team'
import { InstanceMonsterFromID, monsterList } from '../../scripts/data/monsterList'

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
      const teamsToReturn = teamStrs.map((team) => {
        const [teamName, monsters] = team.split(':') //team name separator
        const monsterObjs = monsters.split('/').map((monStr) => {
          //item does nothing atm
          const [speciesId, itemId, nickname] = monStr.split('+')
          const monsterData = InstanceMonsterFromID(speciesId)
          //TODO: add item
          monsterData.setNickname(decodeURI(nickname))
          return monsterData
        })

        return new Team(decodeURI(teamName), monsterObjs)
      })

      return teamsToReturn
    }
  } catch (err) {
    console.error(err)
    return []
  } finally {
    callback()
  }
}

//export function decryptTeam(): Team {
//  return {
//    name: 'fuck'
//  }
//}

export function encryptTeam() {}
