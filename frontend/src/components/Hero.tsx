import { artworkUrl } from '../api'
import type { Pokemon } from '../types'
import { themeFor } from '../typeColors'

interface HeroProps {
  featured: Pokemon | null
  onExplore: () => void
  onSelect: (pokemon: Pokemon) => void
}

export function Hero({ featured, onExplore, onSelect }: HeroProps) {
  const theme = themeFor(featured?.type1)

  return (
    <section className="hero" id="top" style={{ '--accent': theme.color, '--glow': theme.glow } as React.CSSProperties}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb" />
        <div className="hero__grid-lines" />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">// Base de dados nacional · Gerações I–VI</p>
        <h1 className="hero__title">
          <span className="hero__title-line">Todos os</span>
          <span className="hero__title-line hero__title-line--accent">Pokémon.</span>
          <span className="hero__title-line">Um só lugar.</span>
        </h1>
        <p className="hero__subtitle">
          Explore estatísticas de batalha, tipos e gerações de mais de 800 Pokémon —
          com busca instantânea e filtros em tempo real.
        </p>
        <button className="hero__cta" onClick={onExplore}>
          Explorar Pokédex
          <span className="hero__cta-arrow" aria-hidden="true">↓</span>
        </button>
      </div>

      {featured && (
        <button
          className="hero__featured"
          onClick={() => onSelect(featured)}
          aria-label={`Ver detalhes de ${featured.name}`}
        >
          <span className="hero__featured-number">#{String(featured.id).padStart(3, '0')}</span>
          <img
            key={featured.id}
            className="hero__featured-art"
            src={artworkUrl(featured.id)}
            alt={featured.name}
            loading="eager"
          />
          <span className="hero__featured-name">{featured.name}</span>
        </button>
      )}
    </section>
  )
}
