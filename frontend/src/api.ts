import type { Pokemon } from './types'

/**
 * URL base da API, definida em build pela variável VITE_API_URL.
 * Vazia = mesma origem: no `npm run dev`, o proxy do Vite repassa /api para o backend.
 */
export const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '')

export async function fetchAllPokemon(): Promise<Pokemon[]> {
  const response = await fetch(`${API_URL}/api/pokemon`)
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
