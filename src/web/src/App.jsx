import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3001/api";

function App() {
  const [contents, setContents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("Início");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [myList, setMyList] = useState(() => JSON.parse(localStorage.getItem("fulu-list") || "[]"));

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`${API_URL}/content?limit=100`);
        if (!response.ok) throw new Error("Falha ao carregar catálogo");
        setContents(await response.json());
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    localStorage.setItem("fulu-list", JSON.stringify(myList));
  }, [myList]);

  const toggleList = (content) => {
    setMyList((current) =>
      current.some((item) => item.id === content.id)
        ? current.filter((item) => item.id !== content.id)
        : [...current, content],
    );
  };

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let result = contents;
    if (term) result = result.filter((item) => item.title.toLowerCase().includes(term));
    else if (active === "Filmes") result = result.filter((item) => item.type === "MOVIE");
    else if (active === "Séries") result = result.filter((item) => item.type === "SERIES");
    else if (active === "Canais") result = result.filter((item) => item.type === "TV_CHANNEL");
    else if (active === "Minha Lista") result = myList;
    return result;
  }, [contents, search, active, myList]);

  const featured = contents.find((item) => item.featured) || contents[0];

  const navItems = [
    ["Início", "⌂"], ["Filmes", "▶"], ["Séries", "▦"], ["Canais", "◉"], ["Minha Lista", "＋"], ["Usuário", "○"],
  ];

  const Section = ({ title, items }) => (
    <section className="content-section">
      <div className="section-heading"><h2>{title}</h2><button>Ver tudo</button></div>
      <div className="card-row">
        {items.map((item) => (
          <article className="content-card" key={item.id} onClick={() => setSelected(item)}>
            <img src={item.posterUrl} alt={item.title} />
            <div className="card-overlay"><span>{item.title}</span><button aria-label={`Adicionar ${item.title}`} onClick={(event) => { event.stopPropagation(); toggleList(item); }}>{myList.some((saved) => saved.id === item.id) ? "✓" : "+"}</button></div>
          </article>
        ))}
      </div>
    </section>
  );

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setActive("Início")} aria-label="Fulu início">
          <img src="/fulu-icon.png" alt="" />
          <strong>Fulu</strong>
        </button>
        <nav>
          {navItems.map(([label, icon]) => (
            <button key={label} className={active === label ? "active" : ""} onClick={() => setActive(label)}>
              <span>{icon}</span><b>{label}</b>
            </button>
          ))}
        </nav>
      </aside>

      <main>
        <header className="topbar">
          <label className="search-box">
            <span>⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar filmes, séries ou canais" />
          </label>
          <button className="profile"><img src="/fulu-icon.png" alt="" /><span>Visitante</span></button>
        </header>

        {loading && <div className="status">Carregando catálogo...</div>}
        {error && <div className="status error">{error}. Verifique se a API está em execução.</div>}

        {!loading && !error && (
          <>
            {search || active !== "Início" ? (
              <section className="results">
                <h1>{search ? `Resultados para "${search}"` : active}</h1>
                {filtered.length ? <div className="results-grid">{filtered.map((item) => (
                  <article className="content-card grid-card" key={item.id} onClick={() => setSelected(item)}>
                    <img src={item.posterUrl} alt={item.title} />
                    <div className="card-overlay"><span>{item.title}</span></div>
                  </article>
                ))}</div> : <div className="empty">Nenhum título encontrado.</div>}
              </section>
            ) : featured ? (
              <>
                <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(9,11,14,.98) 0%, rgba(9,11,14,.55) 48%, rgba(9,11,14,.05) 100%), url(${featured.backdropUrl})` }}>
                  <div className="hero-content">
                    <span className="original">Fulu original</span>
                    <h1>{featured.title}</h1>
                    <div className="meta"><strong>{featured.year}</strong><span>{featured.rating}</span><span>{featured.duration}</span></div>
                    <p>{featured.description}</p>
                    <div className="actions"><button className="play" onClick={() => setSelected(featured)}>▶ Assistir</button><button className="add" onClick={() => toggleList(featured)}>＋ Minha lista</button></div>
                  </div>
                </section>
                <Section title="Em alta" items={contents.slice(0, 6)} />
                <Section title="Filmes" items={contents.filter((item) => item.type === "MOVIE")} />
                <Section title="Séries" items={contents.filter((item) => item.type === "SERIES")} />
                <Section title="Canais ao vivo" items={contents.filter((item) => item.type === "TV_CHANNEL")} />
              </>
            ) : <div className="empty">O catálogo está vazio.</div>}
          </>
        )}
      </main>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <article className="detail-modal" onClick={(event) => event.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}>×</button>
            <div className="detail-image" style={{ backgroundImage: `linear-gradient(0deg,#111319 5%,transparent 75%),url(${selected.backdropUrl})` }}>
              <div className="detail-actions"><button className="play">▶ Assistir</button><button className="round" onClick={() => toggleList(selected)}>{myList.some((item) => item.id === selected.id) ? "✓" : "+"}</button></div>
            </div>
            <div className="detail-info">
              <h1>{selected.title}</h1>
              <div className="meta"><strong>{selected.year}</strong><span>{selected.rating}</span><span>{selected.duration}</span></div>
              <p>{selected.description}</p>
              <dl><div><dt>Elenco</dt><dd>{selected.cast?.join(", ") || "Não informado"}</dd></div><div><dt>Gêneros</dt><dd>{selected.categories?.map((item) => item.name).join(", ") || "Fulu"}</dd></div></dl>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

export default App;
