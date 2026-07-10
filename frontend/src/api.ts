import type { Pokemon } from './types'

export async function fetchAllPokemon(): Promise<Pokemon[]> {
  const response = await fetch('/api/pokemon')
  if (!response.ok) {
    throw new Error(`API respondeu com status ${response.status}`)
  }
  return response.json()
}

/**
 * Artwork oficial servido pelo CDN do projeto PokeAPI/sprites,
 * indexado pelo número da Pokédex nacional (coluna Id do dataset).
 */
export function artworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function spriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}
