import { FiArrowRight } from 'react-icons/fi'
import { formatDate, truncateWords } from '../utils/format'

const NewsCard = ({ article, expanded, onToggle }) => {
  const catText = Array.isArray(article.category)
    ? article.category.join(' / ')
    : article.category || 'Global'

  const summary = truncateWords(
    article.description || article.content || 'Tap to expand for more context.',
    30,
  )
  const fullDetail = article.content || article.description

  return (
    <article
      className={`news-card ${expanded ? 'is-open' : ''}`}
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
    >
      <div className="news-media">
        <img
          src={
            article.image_url ||
            'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80'
          }
          alt={article.title}
          loading="lazy"
        />
        <span className="pill">{catText}</span>
      </div>
      <div className="news-body">
        <div className="news-meta">
          <span>{article.source_id || 'Newswire'}</span>
          <span>•</span>
          <span>{formatDate(article.pubDate)}</span>
        </div>
        <h3>{article.title}</h3>
        <p>{summary}</p>
        {expanded && fullDetail && <p className="expanded">{fullDetail}</p>}
        <div className="card-actions">
          {article.link && (
            <a
              className="link-out"
              href={article.link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Full story <FiArrowRight />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default NewsCard
