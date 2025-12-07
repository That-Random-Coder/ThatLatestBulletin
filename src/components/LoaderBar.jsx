const LoaderBar = ({ loading, progress }) => {
  return (
    <div className="loader-track" aria-hidden={!loading}>
      <div className="loader-bar" style={{ width: `${progress}%` }} />
    </div>
  )
}

export default LoaderBar
