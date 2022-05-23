import React, { useState, useEffect, useRef } from "react";
import scroller from "./utils/scroller";
import "./App.css"
import { isMobile } from "react-device-detect"
import {
  useMediaQuery
} from '@mui/material';
import { Omni, Arrows, Logo } from "./sections"

function App() {
  const [rerender, setRerender] = useState(false)
  const [selected, setSelected] = useState("Intro")
  const [scrolling, setScrolling] = useState(false)

  const selectedRef = useRef(selected)

  const select = (state) => {
    selectedRef.current = state
    setSelected(state)
  }

  const layout = [
    [null, "Resume", null],
    ["Connect", "Intro", "Projects"],
    [null, "About Me", null],
  ]

  const getSelectedPos = () => {
    let row, col
    for (let r = 0; r < layout.length; r++) {
      let item = layout[r]
      for (let c = 0; c < item.length; c++) {
        if (layout[r][c] === selectedRef.current ?? selected) {
          row = r
          col = c
          break
        }
      }
    }
    return [row, col]
  }

  const keyHandle = (event) => {
    if (!event.code.match(/Arrow/gi)) return true
    let [row, col] = getSelectedPos()
    if (!row && row !== 0) return
    switch (event.code) {
      case "ArrowUp":
        row -= 1;
        break;
      case "ArrowDown":
        row += 1;
        break;
      case "ArrowLeft":
        col -= 1;
        break;
      case "ArrowRight":
        col += 1;
        break;
      default:
        return false
    }
    let rc = layout[row]?.[col]
    // console.log(rc, row, col)
    if (rc) {
      if (!scroller.isScrolling()) setScrolling(true)
      else return
      scroller.scrollToEl(document.getElementById(rc.replace(" ", ""))).then(() => { select(rc); setScrolling(false) })
    }
  }
  const resizer = (event) => {
    setRerender(!rerender)
    scroller.scrollToEl(document.getElementById((selectedRef.current ?? selected).replace(" ", "")), true)
  }
  const scroll = (event) => {
    if (scrolling || scroller.isScrolling() || event.ctrlKey) return false
    let [row, col] = getSelectedPos()
    if (event.deltaY < 0) row -= 1
    else row += 1
    let sel = layout[row]?.[col]
    
    if (sel) {
      setScrolling(true)
      scroller.scrollToEl(document.getElementById(sel.replace(" ", ""))).then(() => {setScrolling(false); select(sel)})
    }
  }

  useEffect(() => {
    scroller.scrollToEl(document.getElementById(selected.replace(" ", "")))
    window.addEventListener("resize", (event) => {return resizer(event)})
    document.addEventListener("keydown", (event) => {return keyHandle(event)})
    document.addEventListener("wheel", (event) => {return scroll(event)})
  }, [])

  const render = () => {
    // if (isMobile || window.innerWidth < 600) return (
    //   <div>Mobile</div>
    // )

    let maxWidth = 0
    layout.forEach(x => {
      if (maxWidth < x.length) maxWidth = x.length
    })

    const contsx = {
      width: "100%",
      height: "100%",
      position: "relative",
      backgroundColor: "#264653",
      margin: 0
    }
    const rowsx = {
      width: 100 * maxWidth + "vw",
      height: "100vh",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      margin: 0,
      padding: 0
    }
    const docsx = {
      width: 100 * maxWidth + "vw",
      height: 100 * layout + "vh",
      margin: 0,
      padding: 0
    }

    let rendered = []
    let i = 0
    for (let r = 0; r < layout.length; r++) {
      let row = layout[r]
      let rowContent = row.map(x => {
        i += 2
        if (x) {
          return <div style={contsx} id={x.replace(" ", "")} key={i}><Omni page={x} /></div>
        }
        return <div style={contsx} key={i} />
      })

      rendered.push((
        <div style={rowsx} key={i + 1}>{rowContent}</div>
      ))
    }

    return (
      <div style={docsx}>
        {rendered}
      </div>
    )
  }

  return (
    <React.Fragment>
      {render()}
      <Arrows
            selectHandle={[selected, select]}
            layout={layout}
            scroller={[scrolling, setScrolling]}
            />
      <Logo sel={[selected, select]} scrollers={[scrolling, setScrolling]} />
    </React.Fragment>
  );
}

export default App;
