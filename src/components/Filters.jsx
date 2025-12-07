import { FiRefreshCw } from 'react-icons/fi'
import { MdCategory } from 'react-icons/md'

const Filters = ({
  categoryOptions,
  countryOptions,
  languageOptions,
  selectedCategories,
  selectedCountries,
  selectedLanguages,
  onToggleCategory,
  onToggleCountry,
  onToggleLanguage,
  onReset,
  notice,
}) => {
  return (
    <section id="filters" className="panel fade-in">
      <div className="panel-head">
        <div>
          <p className="eyebrow">
            <MdCategory /> Filters
          </p>
          <h2>Choose regions, languages, and genres</h2>
          <p>Select up to five in each group; the feed updates instantly.</p>
        </div>
        <button className="ghost" onClick={onReset}>
          Reset <FiRefreshCw />
        </button>
      </div>

      {notice && <div className="notice">{notice}</div>}

      <div className="filter-grid">
        <div>
          <p className="eyebrow">Categories</p>
          <div className="chip-row">
            {categoryOptions.map((cat) => (
              <button
                key={cat}
                className={`chip ${selectedCategories.includes(cat) ? 'active' : ''}`}
                onClick={() => onToggleCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Countries</p>
          <div className="chip-row">
            {countryOptions.map((code) => (
              <button
                key={code}
                className={`chip ${selectedCountries.includes(code) ? 'active' : ''}`}
                onClick={() => onToggleCountry(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Languages</p>
          <div className="chip-row">
            {languageOptions.map((lng) => (
              <button
                key={lng}
                className={`chip ${selectedLanguages.includes(lng) ? 'active' : ''}`}
                onClick={() => onToggleLanguage(lng)}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Filters
