import { FiGlobe } from 'react-icons/fi'
import NewsCard from './NewsCard'

const Bulletins = ({ articles, loading, error, expanded, onToggle }) => {
  return (
    <section id="bulletins" className="panel fade-in">
      <div className="panel-head">
        <div>
          <p className="eyebrow">
            <FiGlobe /> Live bulletins
          </p>
          <h2>Fresh dispatches, expandable details</h2>
          <p>Tap a card to expand and read the deeper context.</p>
        </div>
        {loading && <span className="pill">Refreshing feed…</span>}
        {error && <span className="pill warn">{error}</span>}
      </div>
      <div className="grid">
        {articles.slice(0, 24).map((article, idx) => (
          <NewsCard
            key={`${article.link || article.title}-${idx}`}
            article={article}
            expanded={expanded === idx}
            onToggle={() => onToggle(idx)}
          />
        ))}
      </div>
    </section>
  )
}

export default Bulletins
