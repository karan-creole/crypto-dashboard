import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import DashBoard from "./design-systems/Organisms/DashBoard";

function AppRouter() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/" element={<App />} />
        {/* <App />
        </Route> */}
        <Route exact path="/dashboard/:address" element={<DashBoard />} />
        {/* <DashBoard />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
