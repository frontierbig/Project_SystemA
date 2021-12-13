import Navbar from "./components/Navbar";
import Body from "./components/Body";
import History from "./components/History";
import SignIn from "./components/SingIn";
import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setToken(getToken);
    }
  }, []);

  if (!token) {
    return <SignIn />
  }

  return (
    <div>
      <Router>
        {token && (
          <Fragment>
            <Navbar/>
            <Switch>
              <Route exact path="/" component={History} />
              <Route exact path="/link/body" component={Body} />
            </Switch>
          </Fragment>
        )}
      </Router>
    </div>

  );
}


export default App;
