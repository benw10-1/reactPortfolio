import React, { useState, useEffect } from "react";
import scroller from "../../utils/scroller";
import markUp from "../../utils/markUp";
import "./Landing.css"

function Landing() {
  const render = () => {
    const contst = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      whiteSpace: "nowrap",
    }
    const txtst = {
      fontSize: "65px",
      lineHeight: "2em"
    }
    const tipst = {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#577684",
      fontSize: "25px",
      marginTop: "15px"
    }

    return (
      <div style={contst}>
        <div style={txtst} dangerouslySetInnerHTML={markUp("Hi, my name is Ben", ["ben"])} />
        <div style={txtst} dangerouslySetInnerHTML={markUp("I'm a Fullstack Developer", ["Fullstack Developer"])} />
        <div style={tipst}>(Hover over or click the arrows, scroll, or use the arrow keys to explore my site!)</div>
      </div>
    )
  }

  return (
    <React.Fragment>
      {render()}
    </React.Fragment>
  );
}

export default Landing;
