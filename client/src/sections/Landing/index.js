import React, { useState, useEffect } from "react";
import scroller from "../../utils/scroller";
import markUp from "../../utils/markUp";
import "./Landing.css"
import { Box } from "@mui/material";

function Landing({ isMobile }) {
  const contst = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    whiteSpace: {
      xs: "normal",
      sm: "nowrap",
    },
    width: {
      xs: "100%",
      sm: "unset",
    },
    padding: 0
  }
  const txtst = {
    fontSize: {
      xs: "30px",
      sm: "38px",
      md: "58px",
      lg: "72px",
    },
    lineHeight: "2em"
  }
  const tipst = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#577684",
    fontSize: {
      xs: "15px",
      sm: "16px",
      md: "24px",
      lg: "32px",
    },
    marginTop: "15px"
  }

  return (
    <Box sx={contst}>
      <Box sx={txtst} dangerouslySetInnerHTML={markUp("Hi, my name is Ben", ["Ben"])} />
      <Box sx={txtst} dangerouslySetInnerHTML={markUp("I'm a Fullstack Developer", ["Fullstack Developer"])} />
      {isMobile ? null : <Box sx={tipst}>(Hover over or click the arrows, scroll, or use the arrow keys to explore my site!)</Box>}
    </Box>
  );
}

export default Landing;
