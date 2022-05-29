import React, { useState, useEffect, useRef } from "react";
import "./App.css"
import { Box } from "@mui/material";
import { isMobile } from "react-device-detect"
import { Omni, Arrows } from "./sections"
import { mediaHolder, scroller } from "./utils"

function App() {
  const [rerender, setRerender] = useState(11)

  const layout = [
    [null, "resume", null],
    ["projects", "intro", "connect"],
    [null, "about me", null],
  ]

  const render = () => {
    let maxWidth = 0
    layout.forEach(x => {
      if (maxWidth < x.length) maxWidth = x.length
    })
    const scale = mediaHolder.useSetMedias({
      desktop: 1,
      tablet: .8,
      laptop: .7,
      mobile: .4,
      mobileL: .35,
    })
    const rowsx = {
      width: 100 * maxWidth + "vw",
      height: "100vh",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
      padding: 0
    }
    const docsx = {
      width: 100 * maxWidth + "vw",
      height: 100 * layout.length + "vh",
      margin: 0,
      padding: 0,
    }
    const contsx = {
      width: "100%",
      height: "100%",
      position: "relative",
      backgroundColor: "#264653",
      margin: 0,
    }
    scroller.setDisableBlock(false)
    if (isMobile || window.innerWidth < 600) {
      scroller.setDisableBlock(false)
      scroller.scrollTo(0, 0, true)
      let contsx = {
        width: "100%",
        height: "100vh",
        // position: "relative",
      }

      return (
        <div style={{
          backgroundColor: "#264653", height: "fit-content", width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        }}>
          <Box sx={{ width: "100%" }}>
            <div style={contsx}>
              <Omni scale={scale} page={"intro"} isMobile={true} />
            </div>
            <div style={contsx}>
              <Omni scale={scale} page={"about me"} isMobile={true} />
            </div>
            <div style={contsx}>
              <Omni scale={scale} page={"projects"} isMobile={true} />
            </div>
            <div style={contsx}>
              <Omni scale={scale} page={"connect"} isMobile={true} />
            </div>
          </Box>
        </div>
      )
    }

    let rendered = []
    let i = 0
    for (let r = 0; r < layout.length; r++) {
      let row = layout[r]
      let rowContent = row.map(x => {
        i += 2
        if (x) {
          return <div style={contsx} id={x.replace(" ", "")} key={x}><Omni page={x} scale={scale} isMobile={false} /></div>
        }
        return <div style={contsx} key={i} />
      })

      rendered.push((
        <div style={rowsx} key={i + 1}>{rowContent}</div>
      ))
    }

    return (
      <React.Fragment>
        <div style={docsx}>
          {rendered}
        </div>
        <Arrows
          setRerender={setRerender}
          layout={layout}
          scale={scale}
        />
      </React.Fragment>
    )
  }

  return render()
}

export default App;
