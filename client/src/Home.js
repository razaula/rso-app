import React from "react";
import Nav from "./components/nav";
import Dashboard from "./components/cards/dashboard";

function Home() {
  return (
    <div className="Home">
        <Nav></Nav>
        <div className="body">
          <Dashboard></Dashboard>
        </div>
    </div>
  );
}

export default Home;
