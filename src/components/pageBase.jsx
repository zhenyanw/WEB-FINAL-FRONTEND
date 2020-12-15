import React from "react";
import NavBar from "./navbar.jsx";

function PageBase({ children }) {
  return (
    <div>
      <NavBar />
      <div className="content">{children}</div>
    </div>
  );
}

export default PageBase;
