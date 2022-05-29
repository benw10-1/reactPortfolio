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
import { markUp, scroller, mediaHolder, clamp } from "../../utils";

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

function Project({ obj, tm, grow, modal: [handleOpen, setModalKey], scale }) {
  const render = () => {
    const contsx = {
      width: `${scale * 300}px`,
      height: `${scale * 300}px`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
    const papersx = {
      width: `${scale * 250}px`,
      height: `${scale * 250}px`,
      borderRadius: `${scale * 15}px`,
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
      fontSize: `${scale * 38}px`,
      color: "#E9C46A",
      lineHeight: "1.1em",
      position: "absolute",
      top: "30%",
      transform: "translateY(-50%)",
      "&:hover": {
        cursor: "pointer"
      }
    }
    return (
      <Grow in={grow} {...(grow ? { timeout: tm } : {})} >
        <Grid item={true} sx={contsx} >
          <Paper sx={papersx} onClick={(event) => {
            if (event.defaultPrevented) return false
            setModalKey(obj.name)
            handleOpen()
          }} elevation={7} >
            <Box sx={overSX}>
              <Box classes={"ignore"} sx={headsx} onClick={(event) => { event.preventDefault(); window.open(obj.deployed, "_blank") }}>{obj.name}</Box>
              <GitHub scale={scale} classes={"ignore"} onClick={(event) => { event.preventDefault(); window.open(obj.repo, "_blank") }} style={{ bottom: "10%", position: "absolute" }} />
            </Box>
          </Paper>
        </Grid>
      </Grow>
    )
  }

  return render()
}

function TabPanel({ children, value, index, scale, ...other }) {
  const [page, sPage] = useState(0)
  const pageRef = useRef(page)

  const setPage = (page) => {
    sPage(page)
    pageRef.current = page
  }

  const panelst = {
    width: `${scale * 900}px`,
    position: "relative",
  }

  const gridProps = {
    columns: 3,
    justifyContent: "start",
    rowSpacing: 1,
    sx: {
      height: `${Math.min(scale + .05, 1) * 600}px`,
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
    margin: "0 6px",
    fontSize: `${Math.min(scale + .3, 1) * 37.5}px`,
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
  const scale = mediaHolder.useSetMedias({
    desktop: 1,
    laptop: .8,
    tablet: .6,
    mobile: .55,
    mobileL: .45,
    mobileM: .35,
  })

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
    let proj = <Project scale={scale} obj={x} grow={grow} key={x.name} tm={400 * ((i % 6) + 2)} modal={[handleOpen, setModalKey]} />
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
      height: "100%",
      display: "grid",
      placeItems: "center",
    }
    const tabsx = {
      color: "#577684",
      transition: "all .3s",
      fontSize: `${scale * 37.5}px`,
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
      fontSize: `${clamp(scale + .2, .4, 1) * 24}px`,
      textTransform: "none",
      margin: "0 0 -4px 0",
      lineHeight: "28px"
    }
    let i = 1
    return (
      <div style={contst} >
        <Box sx={boxst}>
          <Box >
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
                let uppered = x.replace(/(^\w)|(?:\s)\w/g, (match) => match.toUpperCase())
                i++
                return <Tab label={<span style={tabst}>{`${uppered}(${projectGroups[x].length})`}</span>} key={i} value={x} sx={tabsx} />
              })}
            </Tabs>
            <TabPanel value={tab} index={tab} scale={scale}>{projectJSX}</TabPanel>
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
    padding: "10px 10px 0 10px",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    color: "#577684",
    borderRadius: "18px"
  }
  const proj = projobj[modalKey]
  const bannersx = {
    backgroundImage: `url(${proj?.images?.[0]})`,
    width: "100%",
    backgroundPosition: "top",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    paddingTop: "35%",
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
    lineHeight: `${clamp(scale, .8, 1) * 50}px`,
    fontSize: "22px",
    overflow: "auto",
    padding: isMobile ? "0 .35em" : "0 .75em",
    textIndent: "1em",
    columnCount: isMobile ? "unset" : "2",
    columnGap: isMobile ? "unset" : "40px",
    // columnRule: isMobile ? "unset" : "solid 1px rgba(0,0,0, .5)",
    overflow: "auto",
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
            <Box sx={bannersx} />
            <Box sx={headersx}><span style={{ cursor: "pointer" }} onClick={(event) => { return proj ? window.open(proj.deployed, "_blank") : null }}>{proj?.name ?? ""}</span></Box>
            <Box dangerouslySetInnerHTML={proj ? markUp(proj.about, proj.tags) : ""} sx={infosx}></Box>
          </Box>
        </Paper>
      </Modal>
      {render()}
    </React.Fragment>
  );
}

export default Projects;
