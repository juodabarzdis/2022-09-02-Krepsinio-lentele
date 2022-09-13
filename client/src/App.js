import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LiveScorePanel from "./LiveScorePanel";
import Home from "./Home";
import Nav from "./Nav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scorepanel" element={<LiveScorePanel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
