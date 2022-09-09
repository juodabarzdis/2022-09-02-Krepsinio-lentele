import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LiveScorePanel from "./LiveScorePanel";
import Home from "./Home";
import Nav from "./Nav";
import MainContext from "./MainContext";

function App() {
  const [contextRefresh, setContextRefresh] = useState(false);

  const contextValues = {
    contextRefresh,
    setContextRefresh,
  };

  return (
    <div className="App">
      <MainContext.Provider value={contextValues}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scorepanel" element={<LiveScorePanel />} />
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    </div>
  );
}

export default App;
