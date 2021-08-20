import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import DashboardAccount from "./pages/DashboardAccount";
import Login from "./pages/Login";

export const UserContext = React.createContext(null);

function App() {
  const [userId, setUserId] = useState("");

  return (
    <Router>
      <UserContext.Provider value={userId}>
        <div className="App">
          <Switch>
            <Route path="/dashboard">
              <DashboardAccount />
            </Route>
            <Route path="/">
              <Login setUserId={setUserId} />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
