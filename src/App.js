import React, { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import Dashboard from "./dashboard";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {!loggedIn ? (
        <>
          <Signup />
          <Login onLogin={() => setLoggedIn(true)} />
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;