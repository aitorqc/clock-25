import React, { useEffect, useState, useRef } from 'react'

export default function Session({ session, breakSession, isPlaying, reset }) {
    const countRef = useRef(null);
    // Usamos un estado local para actualizar los minutos
    const [minutes, setMinutes] = useState(session);
    // Referencia para saber cuando los minutos llegan a cero
    let minRef = minutes;
    // Usamos un estado local para actualizar los segundos
    const [seconds, setSeconds] = useState(0);
    // Referencia para saber cuando los segundos llegan a cero
    let secRef = seconds;
    // Estado para indicar el tiempo de descanso
    let resting = false;
    const [breakMinutes, setBreakMinutes] = useState(breakSession)
    const [breakTime, setBreakTime] = useState(resting);


    // Inicia el cronometro o lo pausa
    useEffect(() => {
        if (isPlaying) {
            handleStart();
        } else {
            handlePause();
        }
    }, [isPlaying]);

    // Controlamos cualquier actualizacion de session o reset para resetear el tiempo
    useEffect(() => {
        setMinutes(session);
        setSeconds(0);
        setBreakMinutes(breakSession)
        setBreakTime(false);
        document.getElementById("beep").pause();
        document.getElementById("beep").currentTime = 0;
    }, [session, breakSession, reset])

    // Actualiza el tiempo
    const handleTime = () => {
        // GESTIONAR CUANDO CAMBIAR EL CRONOMETRO Y CAMBIAR EL COLOR Y AÑADIR AUDIO
        if (minRef === 0 && secRef === 0) {
            document.getElementById("beep").play();
            // Inicia el tiempo de descanso
            if (!resting) {
                setMinutes(breakMinutes);
                minRef = breakMinutes;
                resting = true;
                setBreakTime(resting);
            }
            // VUelve a iniciar la sesion
            else if (resting) {
                setMinutes(session);
                minRef = session;
                resting = false;
                setBreakTime(resting);
            }
        } else {
            if (secRef === 0) {
                secRef = 59;
                setSeconds(59);
                minRef--
                setMinutes((prevState) => prevState - 1);
            } else {
                secRef--;
                setSeconds((prevState) => prevState - 1);
            }
        }
    }

    const handleStart = () => {
        countRef.current = setInterval(() => {
            handleTime()
        }, 1000)
    }

    const handlePause = () => {
        clearInterval(countRef.current)
    }

    return (
        <div className="timer">
            <div className="timer-wrapper" style={(minutes > 0) ? { color: "white" } : { color: "red" }}>
                <div id="timer-label">{!breakTime ? "Session" : "Break"}</div>
                <div id="time-left">{`${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`}</div>
            </div>
            <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
    )
}
