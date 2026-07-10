export interface Pokemon {
  id: number
  name: string
  type1: string
  type2: string | null
  total: number
  hp: number
  attack: number
  defense: number
  sp_atk: number
  sp_def: number
  speed: number
  generation: number
  legendary: boolean
}

export type StatKey = 'hp' | 'attack' | 'defense' | 'sp_atk' | 'sp_def' | 'speed'

export const STAT_LABELS: Record<StatKey, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  sp_atk: 'Atq. Esp.',
  sp_def: 'Def. Esp.',
  speed: 'Velocidade',
}

export const STAT_MAX = 255
