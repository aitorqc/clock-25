import React, { useState } from "react";
import Clock from "./components/Clock";
import Play from "./components/Play";
import Session from "./components/Session";

function App() {
  // Estado que comunica a los componentes el tiempo de la tarea
  const [session, setSession] = useState(25);
  // Estado que comunica a los componentes el tiempo de descanso
  const [breakSession, setBreakSession] = useState(5);
  // Componente que comunica cuando se pausa o inicia el cronometro
  const [play, setPlay] = useState(false);
  const [reset, setReset] = useState(false);

  // Incrementa/Decrementa el tiempo de sesion
  // Si no esta corriendo el tiempo
  const changeSession = (val) => {
    if (!play) {
      if (val === "increase" && session < 60) {
        setSession(session + 1);
      } else if (val === "decrease" && session > 1) {
        setSession(session - 1);
      }
    }
  }

  // Incrementa/Decrementa el tiempo de descanso
  // Si no esta corriendo el tiempo
  const changeBreak = (val) => {
    if (!play) {
      if (val === "increase" && breakSession < 60) {
        setBreakSession(breakSession + 1);
      } else if (val === "decrease" && breakSession > 1) {
        setBreakSession(breakSession - 1);
      }
    }
  }

  // Inicia/Pausa el cronometro
  const activate = () => {
    setPlay(!play);
  }

  // Reinicia todos los valores
  const refresh = () => {
    setSession(25);
    setBreakSession(5);
    setPlay(false);
    // Forzar un cambio de estado
    setReset(!reset);
  }

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="clocks">
        {/* BreakSession*/}
        <Clock id={"break-label"} type={"break"} text={"Break Length"} time={breakSession} changeFunction={changeBreak} />
        {/* Session */}
        <Clock id={"session-label"} type={"session"} text={"Session Length"} time={session} changeFunction={changeSession} />
      </div>
      <Session session={session} breakSession={breakSession} isPlaying={play} reset={reset} />
      <Play activate={activate} refresh={refresh} />
    </div>
  );
}

export default App;
