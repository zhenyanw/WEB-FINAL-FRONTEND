import React from "react";
import NavBar from "./navbar.jsx";
import Copyright from "./copyright.jsx";
import { Box } from "@material-ui/core";

function PageBase({ children }) {
  return (
    <div>
      <NavBar />
      <div className="content">{children}</div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </div>
  );
}

export default PageBase;
