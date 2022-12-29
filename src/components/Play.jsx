import React from 'react'

export default function Play({activate, refresh}) {
  return (
    <div className="timer-control">
        <button id="start_stop" onClick={activate}><i className="fa fa-play fa-2x"></i><i className="fa fa-pause fa-2x"></i></button>
        <button id="reset" onClick={refresh}><i className="fa fa-refresh fa-2x"></i></button>
    </div>
  )
}
