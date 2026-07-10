# Pokédex

Aplicação full-stack de uma Pokédex com mais de 800 Pokémon (gerações I–VI):

- **Backend** — API REST em **Spring Boot** (Java 21) com persistência em **MariaDB/MySQL** via Spring Data JPA
- **Frontend** — SPA em **React + TypeScript** (Vite), com design dark, animações e filtros em tempo real

---

## Funcionalidades

### Frontend (`frontend/`)

- **Hero animado** com um Pokémon lendário em destaque (sorteado a cada visita) e artwork oficial em alta resolução
- **Busca instantânea** por nome ou número da Pokédex, sem recarregar a página
- **Filtros combináveis**: tipo (chips coloridos com a cor de cada tipo), geração, e toggle "somente lendários"
- **Ordenação** por número da Pokédex, nome (A–Z) ou total de stats ("mais fortes")
- **Cards com tema por tipo** — cor de destaque, brilho e hover próprios para cada um dos 18 tipos
- **Modal de detalhes** com as 6 estatísticas de batalha (HP, Ataque, Defesa, Atq. Esp., Def. Esp., Velocidade) em barras animadas, geração e badge de lendário
- **Paginação incremental** ("carregar mais") com revelação escalonada dos cards via `IntersectionObserver`
- **Estados de carregamento e erro** (pokébola girando / botão de retry quando a API está fora)
- **Responsivo** (desktop → mobile) e com suporte a `prefers-reduced-motion`
- Imagens servidas pelo CDN de sprites do projeto [PokeAPI](https://github.com/PokeAPI/sprites), indexadas pelo número da Pokédex

### Backend (`java/`)

API REST de Pokémon:

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/pokemon` | Lista todos os Pokémon |
| `GET` | `/api/pokemon/{nome}` | Busca um Pokémon pelo nome exato |
| `GET` | `/api/pokemon/search/{nome}` | Busca por nome parcial (`LIKE %nome%`) |
| `POST` | `/api/pokemon` | Cadastra um novo Pokémon |
| `DELETE` | `/api/pokemon/{nome}` | Remove um Pokémon pelo nome |

API REST de usuários:

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/user` | Lista todos os usuários |
| `GET` | `/api/user/{email}` | Busca usuário por e-mail |
| `POST` | `/api/user` | Cadastra um novo usuário |
| `DELETE` | `/api/user/{email}` | Remove usuário por e-mail |

Detalhes de implementação:

- **Entidades JPA** `Pokemon` (nome, tipos, stats, geração, lendário) e `User`, com Lombok para reduzir boilerplate
- **Repositories** Spring Data JPA com queries JPQL customizadas (busca exata e parcial por nome)
- **Services** com validação de duplicidade/existência antes de criar ou deletar
- **CORS** liberado para o dev server do Vite (`http://localhost:5173`) em `config/CorsConfig.java`
- Schema gerado automaticamente pelo Hibernate (`ddl-auto=update`)

### Dataset

`pokemon.csv` — 800 registros com id, nome, tipos, os 6 stats de batalha, total, geração e flag de lendário (inclui Mega Evoluções e formas alternativas).

---

## Como rodar

### Pré-requisitos

- Java 21+ · MariaDB (ou MySQL) · Node.js 18+

### 1. Banco de dados

Um único comando cria o database, o usuário da aplicação (`pokedex`/`pokedex`) e importa todos os Pokémon:

```bash
sudo mariadb < db/init.sql        # MariaDB (Arch etc.)
# ou
mysql -u root -p < db/init.sql    # MySQL
```

O script é idempotente (`IF NOT EXISTS` / `INSERT IGNORE`) — pode rodar mais de uma vez sem problema. As credenciais ficam em `java/src/main/resources/application.properties`, e a URL JDBC usa `createDatabaseIfNotExist=true` como rede de segurança.

### 2. Backend (porta 8080)

```bash
cd java
./gradlew bootRun
```

### 3. Frontend (porta 5173)

```bash
cd frontend
npm install
npm run dev
```

Abra **http://localhost:5173** — o Vite faz proxy de `/api` para o backend automaticamente.

Para gerar o build de produção do front: `npm run build` (sai em `frontend/dist/`).

---

## Stack

| Camada | Tecnologias |
| --- | --- |
| Frontend | React 18, TypeScript, Vite 6, CSS puro (custom properties, animações) |
| Backend | Spring Boot 3.5, Spring Data JPA, Lombok, Gradle 9 |
| Banco | MariaDB / MySQL (driver MariaDB Connector/J) |

## Estrutura

```
pokedex/
├── frontend/            # SPA React + TypeScript
│   └── src/
│       ├── components/  # Header, Hero, Toolbar, PokemonCard, PokemonModal, StatBar…
│       ├── hooks/       # useStaggerReveal (animação de entrada dos cards)
│       ├── api.ts       # cliente da API + URLs de artwork
│       ├── typeColors.ts# tema de cor por tipo de Pokémon
│       └── types.ts     # tipos TypeScript compartilhados
├── java/                # API REST Spring Boot
│   └── src/main/java/com/mms/java/
│       ├── controllers/ # PokemonController, UserController
│       ├── service/     # regras de negócio
│       ├── repository/  # Spring Data JPA
│       ├── entity/      # Pokemon, User
│       └── config/      # CORS
├── db/
│   └── init.sql         # cria database, usuário e importa o dataset
└── pokemon.csv          # dataset (800 Pokémon, gerações I–VI)
```
