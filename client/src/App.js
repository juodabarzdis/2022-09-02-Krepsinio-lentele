import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LiveScorePanel from "./LiveScorePanel";
import Home from "./Home";
import Game from "./Game";
import Nav from "./Nav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scorepanel" element={<LiveScorePanel />} />
          <Route path="/game/:id" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
