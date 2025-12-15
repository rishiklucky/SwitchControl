import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ManualControl from "./components/ManualControl";
import Settings from "./components/Settings";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand">SwitchControl</span>

        {/* <div>
          <Link className="btn btn-outline-light me-2" to="/">
            Manual Control
          </Link>
          <Link className="btn btn-outline-light" to="/settings">
            Settings
          </Link>
        </div> */}
      </nav>

      <Routes>
        <Route path="/" element={<ManualControl />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
