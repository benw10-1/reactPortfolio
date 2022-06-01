import { Fade } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { SizeMe } from "react-sizeme"
import { scroller, clamp } from "../../utils";
import Logo from "../Logo";
import "./Arrow.css"

function Arrows({ setRerender, layout, scale }) {
    const [selected, setSelected] = useState("intro")
    const [scrolling, setScrolling] = useState(true)

    const selectedRef = useRef(selected)
    let timeout

    scale = clamp(scale, .3, 1)

    const select = (state) => {
        selectedRef.current = state
        setSelected(state)
    }

    const keyHandle = (event) => {
        if (!event?.code?.match(/Arrow/gi) || scroller.isDisabled()) return false
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
            setScrolling(true)
            let prom = scroller.scrollToEl(document.getElementById(rc.replace(" ", "")))
            if (prom) {
                prom.then(() => {
                    setScrolling(false)
                })
            }
            else {
                setScrolling(false)
            }
        }
    }

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
    const scroll = (event) => {
        if (scroller.isDisabled() || event.ctrlKey) return false
        for (const x of event.composedPath()) {
            const { scrollHeight, id, tagName, clientHeight } = x
            if (id === "root" || tagName === "HTML" || x === document) continue
            if (scrollHeight > clientHeight) return false
        }
        let [row, col] = getSelectedPos()
        if (event.deltaY < 0) row -= 1
        else row += 1
        let sel = layout[row]?.[col]

        if (sel) {
            setScrolling(true)
            scroller.scrollToEl(document.getElementById(sel.replace(" ", ""))).then(() => { select(sel); setScrolling(false)})
        }
    }

    const goToEl = (id) => {
        setScrolling(true)
        select(id)
        id = id.replace(" ", "")
        let el = document.getElementById(id)
        scroller.scrollToEl(el)?.then(() => { setScrolling(false) }) ?? setScrolling(false)
    }

    const enterHandle = (event) => {
        document.querySelectorAll(".animate-text").forEach(x => x.classList.remove("animate-text"))
        let sel
        if (event.target.className === "arrow-cont") sel = event.target
        else sel = event.target.parentElement
        sel.classList.add("animate-text")
        timeout = setTimeout(() => { goToEl(sel.children.item(1).innerHTML) }, 750)
    }

    const exitHandle = (event) => {
        document.querySelectorAll(".animate-text").forEach(x => x.classList.remove("animate-text"))
        clearTimeout(timeout)
    }
    const clickHandle = (event) => {
        document.querySelectorAll(".animate-text").forEach(x => x.classList.remove("animate-text"))
        clearTimeout(timeout)
        let sel
        if (event.target.className === "arrow-cont") sel = event.target.children.item(1).innerHTML
        else sel = event.target.parentElement.children.item(1).innerHTML
        goToEl(sel)
    }

    const resizer = (event) => {
        setRerender(Math.random())
        scroller.scrollToEl(document.getElementById((selectedRef.current ?? selected).replace(" ", "")), true)
        setScrolling(false)
        select(selectedRef.current ?? selected)
    }
    const hashchange = (event) => {
        let sel = selectedRef.current ?? selected
        let hash = window.location.hash.replace("#", "")
        if (layout.some(x => x.some(y => hash === (y ? y.replace(" ", "") : y)))) {
            sel = hash
            select(hash)
        }
        setScrolling(true)
        scroller.scrollToEl(document.getElementById(sel.replace(" ", ""))).then(() => {
            setScrolling(false)
            window.history.replaceState({}, window.location.origin, event.oldURL)
        })
    }
    const loader = (event) => {
        console.log("loader")
        scroller.scrollToEl(document.getElementById((selectedRef.current ?? selected).replace(" ", ""))).then(() => {
            setScrolling(false)
        })
    }

    useEffect(() => {
        window.removeEventListener("load", loader)
        window.addEventListener("load", loader)
        window.removeEventListener("resize", resizer)
        window.addEventListener("resize", resizer)
        document.addEventListener("keydown", keyHandle)
        document.addEventListener("wheel", scroll)
        window.removeEventListener("hashchange", hashchange)
        window.addEventListener("hashchange", hashchange)
    }, [])
    useEffect(() => {
        return () => {
            document.removeEventListener("keydown", keyHandle)
            document.removeEventListener("wheel", scroll)
        }
    }, [])

    function Txt({ text, transform, place = "tb", width, height }) {
        // not rotated because we are using sizeme
        if (place === "left") transform = " translateX(-" + (height / 2 - width / 2) + "px)" + transform
        if (place === "right") transform = " translateX(" + (height / 2 - width / 2) + "px)" + transform
        // ref={newRef}
        return (
            <Fade in={!scrolling}>
                <div className="arrow-cont" style={{ transform, fontSize: `${scale * 1.3}em` }} onMouseEnter={enterHandle} onMouseLeave={exitHandle} onClick={clickHandle} >
                    <div style={{ display: "block" }}>^</div>
                    <div style={{ display: "block" }}>{text}</div>
                </div>
            </Fade>
        )
    }

    const render = () => {
        const contst = {
            display: "flex",
            position: "fixed",
            justifyContent: "center",
            alignItems: "center",
        }

        const arrows = []
        for (let r = 0; r < layout.length; r++) {
            let row = layout[r]
            let found = false
            for (let c = 0; c < row.length; c++) {
                if (row[c] !== selected) continue

                let [left, right, top, bottom] = [layout[r][c - 1], layout[r][c + 1], layout[r - 1]?.[c], layout[r + 1]?.[c]]

                if (left) arrows.push((
                    <div style={{ ...contst, left: 0, top: 0, height: "100%", flexDirection: "column" }} key={"left"}>
                        <SizeMe monitorHeight>
                            {({ size }) => <Txt text={left} transform={"rotateZ(270deg)"} place={"left"} width={size.width} height={size.height} />}
                        </SizeMe>
                    </div>))
                if (right) arrows.push((
                    <div style={{ ...contst, right: 0, top: 0, height: "100%", flexDirection: "column" }} key={"right"}>
                        <SizeMe monitorHeight>
                            {({ size }) => <Txt text={right} transform={"rotateZ(90deg)"} place={"right"} width={size.width} height={size.height} />}
                        </SizeMe>
                    </div>))
                if (top) arrows.push((
                    <div style={{ ...contst, top: 0, width: "100%" }} key={"top"} >
                        <SizeMe monitorHeight>
                            {({ size }) => <Txt text={top} width={size.width} height={size.height} />}
                        </SizeMe>
                    </div>
                ))
                if (bottom) arrows.push((
                    <div style={{ ...contst, bottom: 0, width: "100%" }} key={"bottom"}>
                        <SizeMe monitorHeight>
                            {({ size }) => <Txt transform={"rotateZ(180deg)"} text={bottom} width={size.width} height={size.height} />}
                        </SizeMe>
                    </div>
                ))

                found = true
                break
            }
            if (found) break
        }

        return arrows
    }

    return (
        <div style={{ position: "absolute" }}>
            <Logo sel={[selected, select]} scrollers={[scrolling, setScrolling]} />
            {(() => { if (!scrolling) return render() })()}
        </div>
    );
}

export default Arrows;
