import React, { useState, useEffect, useRef } from "react";
import {
  Tabs,
  Tab,
  Paper,
  Box,
  Fade
} from "@mui/material"
import "./AboutMe.css"
import { markUp } from "../../utils"
import { Me, Info, JS, Python } from "../../icons";
import about from "../../data/about.json"

function TabPanel({ children, value, index, isMobile, ...other }) {
  const panelst = {
    height: "600px",
    display: value !== index ? "none" : "flex",
    justifyContent: "center",
    zIndex: 0,
    WebkitTransform: "translateZ(0)",
    flexGrow: 1,
  }
  const paperst = {
    width: isMobile ? "90%" : "75vw",
    borderRadius: "8px",
    height: "100%",
    backgroundColor: "#Fdfcfa",
    padding: "0 10px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      style={{ ...panelst }}
      {...other}
    >
      {value === index ? (<Paper sx={paperst} elevation={5} >
        {children}
      </Paper>) : null}
    </div>
  )
}

function InnerTab({ name, tabIndex }) {
  const [collapse, setCollapse] = useState(true)
  const [collapse1, setCollapse1] = useState(true)

  useEffect(() => {
    setCollapse(false)
    setCollapse1(false)
    setTimeout(() => { setCollapse1(true) }, 100)
    setTimeout(() => { setCollapse(true) }, 300)
  }, [tabIndex])

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", alignItems: "center" }}>
      <div className="cont-head">
        <Fade in={collapse1}>
          <div>{name}</div>
        </Fade>
      </div>
      <Fade in={collapse}>
        <div className="main-cont" dangerouslySetInnerHTML={markUp(about[name], ["self-taught", "develop", "software", "California", "programming", "evolved", "daily life", "new", "VSauce", "StackOverflow", "convinced", "persevere", "documentation", "tutorial", "problem", "passion", "learning", "Python", "C\\+\\+", "JavaScript", "coding", "modualr", "excelent", "challenge", "UCI", "Developer", "intermediate", "API", "React", "Express", "Three.js", "enjoyment", "MongoDB", "Neo4J", "master", "LeetCode", "web servers", "Numpy", "pandas", "PyQt5", "web scraper", "algorithm", "libraries", "frameworks"])} />
      </Fade>
    </Box>
  )
}

function AboutMe({ scale, isMobile }) {
  const [tabIndex, setTabIndex] = useState(0)
  const [isBottom, setIsBottom] = useState(window.innerWidth <= 900)

  const setTab = (event, index) => {
    setTabIndex(index)
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsBottom(window.innerWidth <= 900)
    })
  })

  const contst = {
    flex: "1 1",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }

  const tabcontst = {
    maxHeight: "750px",
    display: "flex"
  }

  const tabst = {
    padding: "20px 10px",
    margin: "0 0",
  }
  const selectedst = {
    backgroundColor: "rgb(253, 252, 250)",
    boxShadow: "-6px 12px 17px 4px rgba(0,0,0,0.37)"
  }

  const tabs = [
    <Tab icon={<Info />} sx={tabIndex === 0 ? { ...tabst, ...selectedst } : { ...tabst, }} key={0} />,
    <Tab icon={<JS />} sx={tabIndex === 1 ? { ...tabst, ...selectedst } : { ...tabst, }} key={1} />,
    <Tab icon={<Python />} sx={tabIndex === 2 ? { ...tabst, ...selectedst } : { ...tabst, }} key={2} />
  ]

  return (
    <div style={contst}>
      <div style={tabcontst}>
        <Box id="_ignore" sx={{ display: "flex", position: "relative", alignItems: "center", }}>
          <Tabs
            orientation={"horizontal"}
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
              borderRadius: "0 0 10px 10px",
              boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);",
              position: "absolute",
              transform: "translateX(-50%) translateY(94%)",
              left: "50%",
              bottom: 0,
            }}
          >
            {tabs}
          </Tabs>
          <TabPanel value={tabIndex} index={0} isMobile={isMobile} >
            <Me style={{ position: "absolute", left: "10px", width: `${isMobile ? 47 : 65}px`, height: `${isMobile ? 47 : 65}px`, top: `10px`, zIndex: 1, WebkitTransform: "translateZ(1)" }} />
            <InnerTab name="About Me" tabIndex={tabIndex} />
          </TabPanel>
          <TabPanel value={tabIndex} index={1} isMobile={isMobile} >
            <Me style={{ position: "absolute", left: "10px", width: `${isMobile ? 47 : 65}px`, height: `${isMobile ? 47 : 65}px`, top: `10px`, zIndex: 1, WebkitTransform: "translateZ(1)" }} />
            <InnerTab name="JavaScript" tabIndex={tabIndex} />
          </TabPanel>
          <TabPanel value={tabIndex} index={2} isMobile={isMobile} >
            <Me style={{ position: "absolute", left: "10px", width: `${isMobile ? 47 : 65}px`, height: `${isMobile ? 47 : 65}px`, top: `10px`, zIndex: 1, WebkitTransform: "translateZ(1)" }} />
            <InnerTab name="Python" tabIndex={tabIndex} />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export default AboutMe;
