import { BiNews } from 'react-icons/bi'
import { FiMoon, FiSun } from 'react-icons/fi'

const Navbar = ({ theme, onToggleTheme, onNav }) => {
  return (
    <header className="topbar">
      <div className="brand" onClick={() => onNav('hero')}>
        <BiNews />
        <span>ThatLatestBulletin</span>
      </div>
      <nav>
        <button className="ghost" onClick={() => onNav('bulletins')}>
          Bulletins
        </button>
        <button className="ghost" onClick={() => onNav('filters')}>
          Filters
        </button>
        <button className="ghost" onClick={() => onNav('about')}>
          Why us
        </button>
      </nav>
      <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
      </button>
    </header>
  )
}

export default Navbar
