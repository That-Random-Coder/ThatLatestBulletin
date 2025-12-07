import { FiArrowRight, FiTrendingUp } from 'react-icons/fi'

const Hero = ({ selectedCategories, selectedCountries, selectedLanguages, onPrimary, onSecondary }) => {
  return (
    <section id="hero" className="hero fade-in">
      <div className="eyebrow">
        <FiTrendingUp /> Latest updates, tailored for you
      </div>
      <h1>
        ThatLatest
        <span className="glow">Bulletin</span>
      </h1>
      <p>
        ThatLatestBulletin delivers fast, accurate, and thoughtfully curated updates to keep you informed.
        Designed with a smooth and responsive interface, it provides a seamless experience for staying up to
        date with the latest happenings.
      </p>

      <div className="cta-row">
        <button className="primary" onClick={onPrimary}>
          View live bulletins <FiArrowRight />
        </button>
        <button className="secondary" onClick={onSecondary}>
          Adjust filters
        </button>
      </div>
      <div className="metrics">
        <div>
          <span>{selectedCategories.length.toString().padStart(2, '0')}</span>
          <small>Categories</small>
        </div>
        <div>
          <span>{selectedCountries.length} Countries</span>
          <small>{selectedCountries.join(' / ').toUpperCase()}</small>
        </div>
        <div>
          <span>{selectedLanguages.length} Languages</span>
          <small>{selectedLanguages.join(' • ').toUpperCase()}</small>
        </div>
      </div>
    </section>
  )
}

export default Hero
