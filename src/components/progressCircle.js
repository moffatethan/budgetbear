import React, { useRef, useEffect } from 'react'
import './progressCircle.css'

const ProgressCircle = (props) => {
  const percent = props.percent || 0;
  if (props.percent > 100) {
    throw new Error(`Percent ${percent} cannot exceed 100`)
  }
  const progressCircle = useRef()
  const progressText = useRef()
  let radius = null;
  let circumference = 0 

  useEffect(() => {
    radius = progressCircle.current.r.baseVal.value
    circumference = radius * 2 * Math.PI
    progressCircle.current.style.stroke = props.fill || "none"
    progressCircle.current.style.strokeDasharray = circumference
    progressCircle.current.style.strokeDashoffset = circumference - (percent / 100) * circumference
  }, [])
  const cxy = Number(props.cxy)
  return (
    <>
      <svg width={props.width} height={props.height}>
        <circle r={props.radius} cx={props.cxy} cy={props.cxy} className="track"></circle>
        <circle r={props.radius} cx={props.cxy} cy={props.cxy} ref={progressCircle} className="progress"></circle>
        {
        percent === 100
        ? <svg xmlns="http://www.w3.org/2000/svg" width={cxy / 2} height={cxy / 2} viewBox="0 0 24 24" stroke={props.fill || "currentColor"} strokeWidth="2" strokeLinecap="round" x={(cxy + (cxy / 2)) / 2} alignmentBaseline="middle" y={(cxy + (cxy / 2)) / 2} strokeLineJoin="round" className="feather feather-check"><polyline fill="none" points="20 6 9 17 4 12"></polyline></svg>
        :<text x={props.cxy} y={cxy + 10} fill={props.fill || "black"} textAnchor="middle" ref={progressText} className="progress-text" alignmentBaseline="middle">
        {percent}%</text>
        }
      </svg>
    </>
  )
}

export default ProgressCircle
