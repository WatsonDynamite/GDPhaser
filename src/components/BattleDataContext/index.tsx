import React from 'react'
import BattleScene from '../../scripts/scenes/battleScene'

const BattleDataContext = React.createContext<BattleScene | undefined>(undefined)

export default BattleDataContext
