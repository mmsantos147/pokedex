import { useEffect } from 'react'
import { artworkUrl } from '../api'
import { STAT_LABELS, type Pokemon, type StatKey } from '../types'
import { themeFor } from '../typeColors'
import { StatBar } from './StatBar'
import { TypeBadge } from './TypeBadge'

interface PokemonModalProps {
  pokemon: Pokemon
  onClose: () => void
}

const STAT_KEYS: StatKey[] = ['hp', 'attack', 'defense', 'sp_atk', 'sp_def', 'speed']

export function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  const theme = themeFor(pokemon.type1)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={pokemon.name}>
      <article
        className="modal"
        style={{ '--accent': theme.color, '--glow': theme.glow } as React.CSSProperties}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose} aria-label="Fechar">
          ×
        </button>

        <div className="modal__visual">
          <span className="modal__number" aria-hidden="true">
            #{String(pokemon.id).padStart(3, '0')}
          </span>
          <img className="modal__art" src={artworkUrl(pokemon.id)} alt={pokemon.name} />
        </div>

        <div className="modal__info">
          <div className="modal__heading">
            <h2 className="modal__name">{pokemon.name}</h2>
            {pokemon.legendary && <span className="modal__legendary">★ Lendário</span>}
          </div>

          <div className="modal__types">
            <TypeBadge type={pokemon.type1} size="md" />
            {pokemon.type2 && <TypeBadge type={pokemon.type2} size="md" />}
          </div>

          <dl className="modal__facts">
            <div>
              <dt>Geração</dt>
              <dd>{pokemon.generation}</dd>
            </div>
            <div>
              <dt>Total de stats</dt>
              <dd>{pokemon.total}</dd>
            </div>
          </dl>

          <div className="modal__stats">
            {STAT_KEYS.map((key, index) => (
              <StatBar
                key={key}
                label={STAT_LABELS[key]}
                value={pokemon[key]}
                accent={theme.color}
                delay={120 + index * 70}
              />
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
