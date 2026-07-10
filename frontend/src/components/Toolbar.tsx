import { ALL_TYPES, themeFor } from '../typeColors'

export type SortKey = 'id' | 'name' | 'total'

export interface Filters {
  query: string
  type: string | null
  generation: number | null
  legendaryOnly: boolean
  sort: SortKey
}

interface ToolbarProps {
  filters: Filters
  generations: number[]
  resultCount: number
  onChange: (filters: Filters) => void
}

export function Toolbar({ filters, generations, resultCount, onChange }: ToolbarProps) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch })

  return (
    <div className="toolbar">
      <div className="toolbar__row">
        <div className="searchbar">
          <svg className="searchbar__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            className="searchbar__input"
            type="search"
            placeholder="Buscar por nome ou número…"
            value={filters.query}
            onChange={(e) => set({ query: e.target.value })}
            aria-label="Buscar Pokémon"
          />
          {filters.query && (
            <button className="searchbar__clear" onClick={() => set({ query: '' })} aria-label="Limpar busca">
              ×
            </button>
          )}
        </div>

        <div className="toolbar__selects">
          <select
            className="toolbar__select"
            value={filters.generation ?? ''}
            onChange={(e) => set({ generation: e.target.value ? Number(e.target.value) : null })}
            aria-label="Filtrar por geração"
          >
            <option value="">Todas as gerações</option>
            {generations.map((gen) => (
              <option key={gen} value={gen}>
                Geração {gen}
              </option>
            ))}
          </select>

          <select
            className="toolbar__select"
            value={filters.sort}
            onChange={(e) => set({ sort: e.target.value as SortKey })}
            aria-label="Ordenar por"
          >
            <option value="id">Nº da Pokédex</option>
            <option value="name">Nome (A–Z)</option>
            <option value="total">Mais fortes</option>
          </select>

          <button
            className={`toolbar__toggle ${filters.legendaryOnly ? 'is-active' : ''}`}
            onClick={() => set({ legendaryOnly: !filters.legendaryOnly })}
            aria-pressed={filters.legendaryOnly}
          >
            ★ Lendários
          </button>
        </div>
      </div>

      <div className="toolbar__row toolbar__row--types">
        <button
          className={`type-chip ${filters.type === null ? 'is-active' : ''}`}
          onClick={() => set({ type: null })}
        >
          Todos
        </button>
        {ALL_TYPES.map((type) => {
          const theme = themeFor(type)
          return (
            <button
              key={type}
              className={`type-chip ${filters.type === type ? 'is-active' : ''}`}
              style={{ '--accent': theme.color, '--glow': theme.glow } as React.CSSProperties}
              onClick={() => set({ type: filters.type === type ? null : type })}
            >
              {type}
            </button>
          )
        })}
      </div>

      <p className="toolbar__count" role="status">
        {resultCount === 0
          ? 'Nenhum Pokémon encontrado'
          : `${resultCount} Pokémon ${resultCount === 1 ? 'encontrado' : 'encontrados'}`}
      </p>
    </div>
  )
}
