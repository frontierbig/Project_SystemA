import Navbar from "./components/Navbar";
import Body from "./components/Body";
import History from "./components/History";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
        <Navbar/>
        <Switch>
          <Route exact path="/link/History" component={History} />
          <Route exact path="/link/body" component={Body} />
          
        </Switch>
        
    </div>
    </Router>
  );
}

export default App;
