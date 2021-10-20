import Navbar from "./components/Navbar";
import Body from "./components/Body";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
        <Navbar/>
        <Body/>
        
    </div>
    </Router>
  );
}

export default App;
