import React, { useState, useEffect, useRef } from "react";
import scroller from "./utils/scroller";
import "./App.css"
import { isMobile } from "react-device-detect"
import { Omni, Arrows, Logo } from "./sections"

function App() {
  const [rerender, setRerender] = useState(11)
  const [selected, setSelected] = useState("intro")
  const [scrolling, setScrolling] = useState(true)

  const selectedRef = useRef(selected)

  const select = (state) => {
    selectedRef.current = state
    setSelected(state)
  }

  const layout = [
    [null, "resume", null],
    ["projects", "intro", "connect"],
    [null, "about me", null],
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
    if (!event.code.match(/Arrow/gi)) return false
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
    setRerender(Math.random())
    scroller.scrollToEl(document.getElementById((selectedRef.current ?? selected).replace(" ", "")), true)
  }

  const scroll = (event) => {
    if (scrolling || scroller.isScrolling() || event.ctrlKey) return false
    // console.log(event.composedPath())
    for (const x of event.composedPath()) {
      if ((!!x.scrollLeft || !!x.scrollTop) && x !== document && x.tagName !== "HTML") return false
    }
    let [row, col] = getSelectedPos()
    if (event.deltaY < 0) row -= 1
    else row += 1
    let sel = layout[row]?.[col]

    if (sel) {
      setScrolling(true)
      scroller.scrollToEl(document.getElementById(sel.replace(" ", ""))).then(() => { setScrolling(false); select(sel) })
    }
  }

  useEffect(() => {
    scroller.scrollToEl(document.getElementById(selected.replace(" ", ""))).then(() => {
      setScrolling(false)
    })
    window.addEventListener("resize", (event) => resizer(event))
    document.addEventListener("keydown", (event) => keyHandle(event))
    document.addEventListener("wheel", (event) => scroll(event))
    window.addEventListener("hashchange", (event) => {
      window.history.replaceState({}, window.location.origin, event.oldURL)
      setScrolling(true)
      scroller.scrollToEl(document.getElementById(selected.replace(" ", ""))).then(() => {
        setScrolling(false)
      })
    })
  }, [])

  const render = () => {
    if (isMobile || window.innerWidth < 600) {
      return (
        <div>Mobile</div>
      )
    }

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
      height: 100 * layout.length + "vh",
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
      <React.Fragment>
        <div style={docsx}>
          {rendered}
        </div>
        <Arrows
          selectHandle={[selected, select]}
          layout={layout}
          scroller={[scrolling, setScrolling]}
        />
        <Logo sel={[selected, select]} scrollers={[scrolling, setScrolling]} />
      </React.Fragment>
    )
  }

  return render()
}

export default App;
