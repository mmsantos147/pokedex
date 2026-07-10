interface HeaderProps {
  count: number
}

export function Header({ count }: HeaderProps) {
  return (
    <header className="header">
      <a className="header__brand" href="#top" aria-label="Pokédex — início">
        <img src="/pokeball.svg" alt="" width={28} height={28} />
        <span>
          Poké<em>dex</em>
        </span>
      </a>
      <div className="header__meta">
        <span className="header__count">{count}</span> Pokémon registrados
      </div>
    </header>
  )
}
