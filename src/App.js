import React, { useEffect, useRef } from "react";
import "./App.css";
import Portfolio from "./Portfolio";
import { trackVisit } from "./components/visittracker";   // ← correct path

function App() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackVisit();
  }, []);

  return <Portfolio />;
}

export default App;