import React from 'react'

export default function Clock({id, type, text, time, changeFunction}) {
    return (
        <div className="length-control">
            <div id={id}>{text}</div>
            <button className="btn-level" id={`${type}-decrement`} onClick={()=>changeFunction("decrease")}><i className="fa fa-arrow-down fa-2x"></i></button>
            <div className="btn-level" id={`${type}-length`}>{time}</div>
            <button className="btn-level"id={`${type}-increment`} onClick={()=>changeFunction("increase")}><i className="fa fa-arrow-up fa-2x"></i></button>
        </div>
    )
}
