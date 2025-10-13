export default function ProgressBar({progress = 0}){
    return(
        <div className="container-progress">
            <div className="progress-fill">
               <span className="progress-label">`${progress}%`</span>
            </div>

        </div>
    )
}