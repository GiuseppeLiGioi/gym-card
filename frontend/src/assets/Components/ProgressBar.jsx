export default function ProgressBar({progress = 0}){
  return (
    <div className="container-progress">
      <div
        className="progress-fill"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="progress-label">{progress}%</span>
    </div>
  )
}