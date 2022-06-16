import React, { useState, useEffect, useRef } from "react";
import { GitHub } from "../../icons";
import "./Projects.css"
import projects from "../../data/projects.json"
import {
  Box,
  Tabs,
  Tab,
  Grid,
  Grow,
  Paper,
  Modal,
  Zoom
} from "@mui/material";
import { markUp, scroller, smoothFrom } from "../../utils";

const projobj = Object.fromEntries(projects.map(x => {
  const cpy = { ...x }

  return [x.name, cpy]
}))
const copyproj = projects.map(x => x)
const tagGroups = ["data visualization"]
const projectGroups = Object.fromEntries(tagGroups.map(x => {
  let projs = []
  copyproj.forEach(y => {
    if (y.tags.includes(x)) projs.push(y)
  })
  return [x, projs]
}))

function Project({ obj, tm, grow, modal: [handleOpen, setModalKey], isMobile }) {
  const contsx = {
    width: {
      xs: "150px",
      sm: "180px",
      md: "250px",
      lg: "300px",
    },
    height: {
      xs: "150px",
      sm: "180px",
      md: "250px",
      lg: "300px",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
  const papersx = {
    width: {
      xs: "100px",
      sm: "160px",
      md: "220px",
      lg: "250px",
    },
    height: {
      xs: "100px",
      sm: "160px",
      md: "220px",
      lg: "250px",
    },
    borderRadius: {
      xs: "5px",
      md: "15px",
    },
    background: `url(${typeof obj.images === "string" ? obj.images : obj.images[0]})`,
    backgroundPosition: "center",
    backgroundSize: "500px",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    "&:hover": {
      cursor: "zoom-in"
    }
  }
  const overSX = {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, .5)",
    opacity: 0,
    transition: "all .3s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    position: "relative",
    "&:hover": {
      opacity: 1
    }
  }
  const headsx = {
    textAlign: "center",
    fontSize: {
      xs: "16px",
      sm: "22px",
      md: "28px",
      lg: "34px",
    },
    color: "#E9C46A",
    lineHeight: "1.1em",
    position: "absolute",
    top: "30%",
    transform: "translateY(-50%)",
  }

  return (
    <Zoom in={grow} style={{ transitionDelay: grow ? `${tm}ms` : "0ms" }} >
      <Grid item={true} sx={contsx} >
        <Paper sx={papersx} onClick={(event) => {
          if (event.defaultPrevented) return false
          setModalKey(obj.name)
          handleOpen()
        }} elevation={7} >
          {isMobile ? null :
            <Box sx={overSX}>
              <Box classes={"ignore"} sx={headsx}>
                <span
                  style={{ backgroundColor: "#E76F51", lineHeight: "2rem", cursor: "pointer" }}
                  onClick={(event) => { event.preventDefault(); window.open(obj.deployed, "_blank") }}>
                  {obj.name}
                </span>
              </Box>
              <GitHub classes={"ignore"} onClick={(event) => { event.preventDefault(); window.open(obj.repo, "_blank") }} />
            </Box>}
        </Paper>
      </Grid>
    </Zoom>
  )
}

function TabPanel({ children, value, index, isMobile, ...other }) {
  const [page, sPage] = useState(0)
  const pageRef = useRef(page)

  const setPage = (page) => {
    sPage(page)
    pageRef.current = page
  }

  const panelst = {
    width: {
      xs: "100%",
      sm: "600px",
      md: "750px",
      lg: "900px",
    },
    position: "relative",
  }

  const gridProps = {
    columns: isMobile ? 2 : 3,
    rowSpacing: 1,
    alignItems: "center",
    direction: "column",
    sx: {
      height: {
        xs: "450px",
        sm: "400px",
        md: "500px",
        lg: "600px",
      },
      margin: 0
    }
  }

  useEffect(() => {
    if (page !== 0) setPage(0)
  }, [children])

  const indicatorst = {
    color: "#577684",
    transition: "all .3s",
    textDecoration: "underline",
    cursor: "pointer",
    margin: ".5rem 6px 0",
    fontSize: {
      sm: "28px",
      md: "34px",
      lg: "40px",
    },
    fontWeight: "bolder",
    fontFamily: "'Courier New', Courier, monospace",
    userSelect: "none",
    "&:hover": {
      color: "#F4A261"
    }
  }
  const selectedst = {
    color: "#F4A261"
  }

  const hasPagination = children.length > 6
  const pages = Math.ceil(children.length / 6)
  const pageIndicators = (
    <div style={{ height: "36px", display: "flex", justifyContent: "center", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
      {(() => {
        let indicators = []
        for (let i = 0; i < pages; i++) {
          const x = i
          indicators.push(<Box sx={pageRef.current === x ? { ...indicatorst, ...selectedst } : indicatorst} onClick={() => { setPage(x) }} key={i}>{i + 1}</Box>)
        }

        return indicators
      })()}
    </div>
  )

  return (
    <React.Fragment>
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        sx={panelst}
        {...other}
      >
        {value === index ? (<Grid container={true} {...gridProps}>{children.slice(page * 6, page * 6 + 6)}</Grid>) : null}
      </Box>
      {(hasPagination && value === index) ? pageIndicators : null}
    </React.Fragment>
  )
}

// const isLink = new RegExp("^(https?://)?([\\da-z.-]+)\.([a-z.]{2,6})([\\w.-]*)*(?:/?)+$")

function Projects({ isMobile }) {
  const [tab, setTab] = useState("all")
  const [grow, setGrow] = useState(true)
  const [currentProjects, setCurrentProjects] = useState(projects)
  const [open, setOpen] = useState(false)
  const [modalKey, setModalKey] = useState("")

  const handleOpen = () => {
    setOpen(true)
    scroller.setDisabled(true)
  }
  const handleClose = () => {
    setOpen(false)
    scroller.setDisabled(false)
  }

  let timeout
  const changeHandle = (event, newtab) => {
    setTab(newtab)
    setGrow(false)
    clearTimeout(timeout)
    setTimeout(() => {
      setGrow(true)
      setCurrentProjects(projectGroups[newtab] ?? projects)
    }, 500)
  }

  const projectJSX = currentProjects.map((x, i) => {
    return <Project isMobile={isMobile} obj={x} grow={grow} key={x.name} tm={smoothFrom(0, 700, (i % 6) / 6)} modal={[handleOpen, setModalKey]} />
  })

  const contst = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
  const boxst = {
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
  }
  const tabsx = {
    color: "#577684",
    transition: "all .3s",
    fontSize: {
      xs: "18px",
      sm: "24px",
      md: "30px",
      lg: "36px",
    },
    fontWeight: "bolder",
    fontFamily: "'Courier New', Courier, monospace",
    width: "fit-content",
    "&:hover": {
      color: "#F4A261"
    },
    "&.MuiTab-root.Mui-selected": {
      color: "#F4A261"
    }
  }
  const tabst = {
    fontFamily: "ff-tisa-sans-web-pro, sans-serif",
    fontSize: {
      xs: "18px",
      sm: "24px",
      md: "30px",
      lg: "36px",
    },
    textTransform: "none",
    display: "inline-block",
    margin: "0 0 -4px 0",
    padding: {
      sm: "4x 0",
      lg: "8px 0"
    },
  }

  const paperst = {
    outline: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "85%",
    width: "70%",
    left: "50%",
    top: "50%",
    padding: "10px 10px 0 10px",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    color: "#577684",
    borderRadius: "18px"
  }
  const proj = projobj[modalKey]
  const bannersx = {
    width: "100%",
    height: "40%",
  }
  const headersx = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    fontSize: "38px",
    fontWeight: "bolder",
    color: "#E76F51",
    marginTop: "5px",
    textAlign: "center",
    borderBottom: "2px solid #264653"
  }
  const infosx = {
    lineHeight: {
      xs: "38px",
      md: "50px",
    },
    fontSize: "22px",
    overflow: "auto",
    padding: `.5rem 1rem`,
    textIndent: "1em",
    columnCount: isMobile ? "unset" : "2",
    columnGap: isMobile ? "unset" : "1rem",
    // columnRule: isMobile ? "unset" : "solid 1px rgba(0,0,0, .5)",
  }

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="project-modal"
      >
        <Paper style={paperst} elevation={7}>
          <Box sx={{ width: "100%", height: "100%", position: "relative", display: "flex", flexDirection: "column" }}>
            <Box sx={bannersx}>
              <img style={{ objectFit: "contain", cursor: "default" }} src={proj?.images?.[0] ?? proj?.images} alt={proj?.name ?? "Project"} width={"100%"} height={"100%"} />
            </Box>
            <Box sx={headersx}><span style={{ cursor: "pointer" }} onClick={(event) => { return proj ? window.open(proj.deployed, "_blank") : null }}>{proj?.name ?? ""}</span></Box>
            <Box dangerouslySetInnerHTML={proj ? markUp(proj.about, proj.tags) : ""} sx={infosx}></Box>
          </Box>
        </Paper>
      </Modal>
      <div style={contst} >
        <Box sx={boxst}>
          <Box>
            <Tabs
              value={tab}
              onChange={changeHandle}
              TabIndicatorProps={{
                style: { backgroundColor: "#F4A261" }
              }}
              centered
            >
              <Tab label={<Box style={tabst}>{`All(${projects.length})`}</Box>} value={"all"} sx={tabsx} />
              {Object.keys(projectGroups).map((x, i) => {
                let uppered = x.replace(/(^\w)|(?:\s)\w/g, (match) => match.toUpperCase())

                return <Tab label={<Box style={tabst}>{`${uppered}(${projectGroups[x].length})`}</Box>} key={x} value={x} sx={tabsx} />
              })}
            </Tabs>
            <TabPanel value={tab} index={tab} isMobile={isMobile}>{projectJSX}</TabPanel>
          </Box>
        </Box>
      </div>
    </React.Fragment>
  );
}

export default Projects;
