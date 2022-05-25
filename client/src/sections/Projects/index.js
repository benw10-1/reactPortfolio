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
  Modal
} from "@mui/material";

const projobj = Object.fromEntries(projects.map(x => {
  const cpy = { ...x }
  delete cpy.name

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

function Project({ obj, tm, grow, modal: [handleOpen, setModalKey] }) {
  const render = () => {
    const contsx = {
      width: "300px",
      height: "300px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
    const papersx = {
      width: "250px",
      height: "250px",
      borderRadius: "15px",
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
      justifyContent: "space-around",
      alignItems: "center",
      position: "relative",
      "&:hover": {
        opacity: 1
      }
    }
    const headsx = {
      textAlign: "center",
      fontSize: "38px",
      color: "#E9C46A",
      lineHeight: "1.1em",
      "&:hover": {
        cursor: "pointer"
      }
    }
    return (
      <Grow in={grow} {...(grow ? { timeout: tm } : {})} >
        <Grid item={true} sx={contsx} >
          <Paper sx={papersx} onClick={(event) => {
            if (event.defaultPrevented) return false
            // if (event.composedPath().find((el) => el.classList.has("ignore"))) return false
            setModalKey(obj.name)
            handleOpen()
          }} elevation={7} >
            <Box sx={overSX}>
              <Box classes={"ignore"} sx={headsx} onClick={(event) => {event.preventDefault(); window.location.assign(obj.deployed)}}>{obj.name}</Box>
              <GitHub classes={"ignore"} onClick={(event) => {event.preventDefault(); window.location.assign(obj.repo)}} />
            </Box>
          </Paper>
        </Grid>
      </Grow>
    )
  }

  return render()
}

function TabPanel({ children, value, index, ...other }) {
  const [page, setPage] = useState(0)

  const panelst = {
    width: "900px",
    position: "relative",
  }

  const gridProps = {
    columns: 3,
    justifyContent: "start",
    rowSpacing: 1,
    sx: {
      height: "600px",
      margin: 0
    }
  }

  // useEffect(() => {
  //   if (page !== 0) setPage(0)
  // }, [index])

  const PageIndicator = ({ index }) => {
    const indicatorst = {
      color: "#577684",
      transition: "all .3s",
      textDecoration: "underline",
      cursor: "pointer",
      margin: "0 10px",
      fontSize: "37.5px",
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

    return <Box sx={page === index ? { ...indicatorst, ...selectedst } : indicatorst} onClick={() => setPage(index)}>{index + 1}</Box>
  }

  const hasPagination = children.length > 6
  const pages = Math.ceil(children.length / 6)
  const pageIndicators = (
    <div style={{ width: "100%", height: "36px", display: "flex", justifyContent: "center" }}>
      {(() => {
        let indicators = []
        for (let i = 0; i < pages; i++) {
          indicators.push(<PageIndicator key={i} index={i} />)
        }

        return indicators
      })()}
    </div>
  )

  return (
    <React.Fragment>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        style={{ ...panelst }}
        {...other}
      >
        {value === index ? (<Grid container={true} {...gridProps}>{children.slice(page * 6, page * 6 + 6)}</Grid>) : null}
      </div>
      {(hasPagination && value === index) ? pageIndicators : null}
    </React.Fragment>
  )
}

function Projects() {
  const [tab, setTab] = useState("all")
  const [grow, setGrow] = useState(true)
  const [currentProjects, setCurrentProjects] = useState(projects)
  const [open, setOpen] = useState(false)
  const [modalKey, setModalKey] = useState("")

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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

  let i = 0
  const projectJSX = currentProjects.map(x => {
    let proj = <Project obj={x} grow={grow} key={x.name} tm={400 * ((i % 6) + 2)} modal={[handleOpen, setModalKey]}/>
    i++
    return proj
  })

  const render = () => {
    const contst = {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
    const boxst = {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }
    const tabsx = {
      color: "#577684",
      transition: "all .3s",
      fontSize: "37.5px",
      fontWeight: "bolder",
      fontFamily: "'Courier New', Courier, monospace",
      "&:hover": {
        color: "#F4A261"
      },
      "&.MuiTab-root.Mui-selected": {
        color: "#F4A261"
      }
    }
    const tabst = {
      fontFamily: "ff-tisa-sans-web-pro, sans-serif",
      fontSize: "24px",
      textTransform: "none",
      margin: "0 0 -4px 0",
      lineHeight: "28px"
    }
    let i = 1
    return (
      <div style={contst} >
        <Box sx={boxst}>
          <Box sx={{ width: "100%", height: "70vh", display: "flex", flexDirection: "column", alignItems: "center" }} >
            <Tabs
              value={tab}
              onChange={changeHandle}
              TabIndicatorProps={{
                style: { backgroundColor: "#F4A261" }
              }}
              centered
            >
              <Tab label={<span style={tabst}>{`All(${projects.length})`}</span>} value={"all"} sx={tabsx} />
              {Object.keys(projectGroups).map(x => {
                let uppered = x.replace(/^\w|(?<=\s+)\w/g, (match) => match.toUpperCase())
                i++
                return <Tab label={<span style={tabst}>{`${uppered}(${projectGroups[x].length})`}</span>} key={i} value={x} sx={tabsx} />
              })}
            </Tabs>
            <TabPanel value={tab} index={tab}>{projectJSX}</TabPanel>
          </Box>
        </Box>
      </div>
    )
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
    transform: "translate(-50%, -50%)",
    position: "absolute",
    color: "#577684"
  }

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="project-modal"
      >
        {(() => {
          return (
            <Paper style={paperst} elevation={7}>
              {modalKey ?? "wrong?"}
            </Paper>
          )
        })()}
      </Modal>
      {render()}
    </React.Fragment>
  );
}

export default Projects;
