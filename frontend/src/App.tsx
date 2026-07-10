import { useEffect, useMemo, useRef, useState } from 'react'
import { fetchAllPokemon } from './api'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PokemonCard } from './components/PokemonCard'
import { PokemonModal } from './components/PokemonModal'
import { Toolbar, type Filters } from './components/Toolbar'
import { useStaggerReveal } from './hooks/useStaggerReveal'
import type { Pokemon } from './types'

const PAGE_SIZE = 48

const INITIAL_FILTERS: Filters = {
  query: '',
  type: null,
  generation: null,
  legendaryOnly: false,
  sort: 'id',
}

type LoadState = 'loading' | 'ready' | 'error'

export default function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS)
  const [selected, setSelected] = useState<Pokemon | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const gridSectionRef = useRef<HTMLElement>(null)

  const load = () => {
    setLoadState('loading')
    fetchAllPokemon()
      .then((data) => {
        setPokemon(data)
        setLoadState('ready')
      })
      .catch(() => setLoadState('error'))
  }

  useEffect(load, [])

  const generations = useMemo(
    () => [...new Set(pokemon.map((p) => p.generation))].sort((a, b) => a - b),
    [pokemon],
  )

  const featured = useMemo(() => {
    if (pokemon.length === 0) return null
    const legendaries = pokemon.filter((p) => p.legendary)
    const pool = legendaries.length > 0 ? legendaries : pokemon
    return pool[Math.floor(Math.random() * pool.length)]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon.length])

  const filtered = useMemo(() => {
    const query = filters.query.trim().toLowerCase()
    const result = pokemon.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query) && String(p.id) !== query) return false
      if (filters.type && p.type1 !== filters.type && p.type2 !== filters.type) return false
      if (filters.generation !== null && p.generation !== filters.generation) return false
      if (filters.legendaryOnly && !p.legendary) return false
      return true
    })

    switch (filters.sort) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'total':
        result.sort((a, b) => b.total - a.total)
        break
      default:
        result.sort((a, b) => a.id - b.id)
    }
    return result
  }, [pokemon, filters])

  const visible = filtered.slice(0, visibleCount)
  const gridRef = useStaggerReveal([visible.length, filters])

  const applyFilters = (next: Filters) => {
    setFilters(next)
    setVisibleCount(PAGE_SIZE)
  }

  const scrollToGrid = () => {
    gridSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header count={pokemon.length} />

      <main>
        <Hero featured={featured} onExplore={scrollToGrid} onSelect={setSelected} />

        <section className="collection" ref={gridSectionRef}>
          <div className="collection__inner">
            <h2 className="collection__title">
              <span aria-hidden="true">01 /</span> A coleção
            </h2>

            {loadState === 'loading' && (
              <div className="state">
                <div className="state__pokeball" aria-hidden="true" />
                <p>Carregando Pokédex…</p>
              </div>
            )}

            {loadState === 'error' && (
              <div className="state">
                <p className="state__title">Não foi possível conectar à API.</p>
                <p>Verifique se o backend Spring Boot está rodando em http://localhost:8080.</p>
                <button className="state__retry" onClick={load}>
                  Tentar novamente
                </button>
              </div>
            )}

            {loadState === 'ready' && (
              <>
                <Toolbar
                  filters={filters}
                  generations={generations}
                  resultCount={filtered.length}
                  onChange={applyFilters}
                />

                <div className="grid" ref={gridRef}>
                  {visible.map((p, index) => (
                    <PokemonCard key={`${p.id}-${p.name}-${index}`} pokemon={p} onSelect={setSelected} />
                  ))}
                </div>

                {visibleCount < filtered.length && (
                  <div className="grid__more">
                    <button className="grid__more-btn" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
                      Carregar mais ({filtered.length - visibleCount} restantes)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Pokédex — Spring Boot + React · dados de{' '}
          <a href="https://pokeapi.co" target="_blank" rel="noreferrer">
            PokeAPI
          </a>{' '}
          sprites
        </p>
      </footer>

      {selected && <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
