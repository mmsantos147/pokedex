import { artworkUrl } from '../api'
import type { Pokemon } from '../types'
import { themeFor } from '../typeColors'
import { TypeBadge } from './TypeBadge'

interface PokemonCardProps {
  pokemon: Pokemon
  onSelect: (pokemon: Pokemon) => void
}

export function PokemonCard({ pokemon, onSelect }: PokemonCardProps) {
  const theme = themeFor(pokemon.type1)

  return (
    <button
      className="card reveal"
      style={{ '--accent': theme.color, '--glow': theme.glow } as React.CSSProperties}
      onClick={() => onSelect(pokemon)}
      aria-label={`Ver detalhes de ${pokemon.name}`}
    >
      <div className="card__halo" aria-hidden="true" />
      <div className="card__top">
        <span className="card__number">#{String(pokemon.id).padStart(3, '0')}</span>
        {pokemon.legendary && <span className="card__legendary" title="Lendário">★</span>}
      </div>
      <div className="card__art-wrap">
        <img
          className="card__art"
          src={artworkUrl(pokemon.id)}
          alt={pokemon.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.visibility = 'hidden'
          }}
        />
      </div>
      <h3 className="card__name">{pokemon.name}</h3>
      <div className="card__types">
        <TypeBadge type={pokemon.type1} />
        {pokemon.type2 && <TypeBadge type={pokemon.type2} />}
      </div>
      <div className="card__footer">
        <span className="card__stat-label">Total</span>
        <span className="card__stat-value">{pokemon.total}</span>
      </div>
    </button>
  )
}
