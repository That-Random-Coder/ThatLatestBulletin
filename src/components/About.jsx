import { FiTrendingUp } from 'react-icons/fi'

const About = () => {
  return (
    <section id="about" className="panel fade-in outro">
      <div className="panel-head">
        <p className="eyebrow">
          <FiTrendingUp /> Why we publish
        </p>
        <h2>Trusted journalism, daily.</h2>
        <p>
          We track verified wires, accredited local bureaus, and specialist desks across science,
          technology, education, and public safety. Every headline is timestamped, source-labeled, and
          checked against duplicate feeds to keep your brief concise and credible.
        </p>
        <p>
          Our editors prioritize clarity: short summaries up top, full context on tap, and live region
          and language filters so you can follow stories where they happen. We maintain transparent
          sourcing and refresh cycles, and we never bury corrections—updates ride on the same card.
        </p>
        <p>
          Reader-first design means low-latency delivery, accessible typography, and layouts that hold
          up on mobile commutes and desktop research alike. You get the facts fast, without the noise.
        </p>
      </div>
      <div className="cta-row">
        <button className="primary" onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}>
          Back to top
        </button>
        <button className="secondary" onClick={() => document.getElementById('bulletins')?.scrollIntoView({ behavior: 'smooth' })}>
          Explore bulletins
        </button>
      </div>
    </section>
  )
}

export default About
