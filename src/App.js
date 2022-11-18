import { BrowserRouter as Router} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import ScrollToTop from "./routes/ScrollToTop";
import { useEffect } from "react";
import AnimatedRoutes from "./routes/AnimatedRoutes";

function App() {
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);
  return (
    <div className="App">
      <Router>
          <ScrollToTop />

          <div className="w-screen top-0 bg-slate-800 fixed z-10">
            <Navbar />
          </div>
          <div className="justify-center items-center mt-12">
            <AnimatedRoutes></AnimatedRoutes>
          </div>
        </Router>
    </div>
  );
}

export default App;
