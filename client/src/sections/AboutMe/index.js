import React, { useState, useEffect } from "react";
import scroller from "../../utils/scroller";
import {
  Tabs,
  Tab,
  Paper,
  Box
} from "@mui/material"
import "./AboutMe.css"
import { markUp } from "../../utils"
import { Me, Info, JS, Python } from "../../icons";
import about from "../../data/about.json"

function TabPanel({ children, value, index, ...other }) {
  const panelst = {
    width: "75vw",
    minWidth: "600px",
    height: "100%",
    maxHeight: "600px"
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      style={{ ...panelst }}
      {...other}
    >
      {value === index ? (<Paper style={{ width: "97%", borderRadius: "8px", height: "100%", backgroundColor: "#Fdfcfa", padding: "0 10px 10px 10px", margin: 0, overflow: "hidden" }} elevation={5} >
        {children}
      </Paper>) : null}
    </div>
  )
}

function AboutMe() {
  const [tabIndex, setTabIndex] = useState(0)

  const setTab = (event, index) => {
    setTabIndex(index)
  }

  const contst = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  }

  const tabcontst = {
    maxHeight: "750px",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
  }
  // backgroundColor: "#Fdfcfa",
  // #577684

  const render = () => {
    const tabst = {
      padding: "20px 10px",
      margin: "0 0"
    }
    const selectedst = {
      backgroundColor: "#Fdfcfa",
      boxShadow: "-6px 12px 17px 4px rgba(0,0,0,0.37)"
    }
    const dualst = {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      WebkitTransform: "translateZ(0)",
      zIndex: 0
    }

    const tabs = [
      <Tab icon={<Info />} sx={tabIndex === 0 ? { ...tabst, ...selectedst } : { ...tabst, }} key={0} />,
      <Tab icon={<JS />} sx={tabIndex === 1 ? { ...tabst, ...selectedst } : { ...tabst, }} key={1} />,
      <Tab icon={<Python />} sx={tabIndex === 2 ? { ...tabst, ...selectedst } : { ...tabst, }} key={2} />
    ]
    return (
      <div id="AboutMe" style={contst}>
        <div style={tabcontst}>

          <Box sx={{ display: "flex", height: "750px", width: "100%" }}>
            <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative" }}>
              <Tabs
                orientation="vertical"
                variant="standard"
                value={tabIndex}
                onChange={setTab}
                TabIndicatorProps={{
                  style: { display: "none" }
                }}
                sx={{
                  // border: "2px 0 0 0 solid black", 
                  height: "fit-content",
                  backgroundColor: "#577684",
                  borderRadius: "10px 0 0 10px",
                  boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);",
                }}
              >
                {(() => {
                  for (let i = 0; i < tabs.length;)
                    return tabs
                })()}
              </Tabs>
            </div>
            <div style={dualst}>
              <div style={{ width: "100%", justifyContent: "center", display: "flex", minHeight: "100px" }}>
                <Me />
              </div>
              <TabPanel value={tabIndex} index={0}>
                <div className="cont-head">
                  About Me
                </div>
                <div className="main-cont" dangerouslySetInnerHTML={markUp(about["About Me"], [])} />
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                <div className="cont-head">
                  JavaScript
                </div>
                <div className="main-cont" dangerouslySetInnerHTML={markUp(about["JavaScript"], [])} />
              </TabPanel>
              <TabPanel value={tabIndex} index={2}>
                <div className="cont-head">
                  Python
                </div>
                <div className="main-cont" dangerouslySetInnerHTML={markUp(about["Python"], [])} />
              </TabPanel>
            </div>
          </Box>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      {render()}
    </React.Fragment>
  );
}

export default AboutMe;
