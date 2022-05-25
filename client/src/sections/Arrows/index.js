import { Fade } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { SizeMe } from "react-sizeme"
import { scroller, clamp } from "../../utils";
import "./Arrow.css"

function Arrows({ selectHandle: [selected, setSelected], layout, scroller: [scrolling, setScrolling] }) {
    let timeout

    const goToEl = (id) => {
        setScrolling(true)
        setSelected(id)
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

    function Txt({ text, transform, place = "tb", width, height }) {
        // not rotated because we are using sizeme
        if (place === "left") transform = " translateX(-" + (height / 2 - width / 2) + "px)" + transform
        if (place === "right") transform = " translateX(" + (height / 2 - width / 2) + "px)" + transform
        // ref={newRef}
        return (
            <Fade in={!scrolling}>
                <div className="arrow-cont" style={{ transform, fontSize: "1.3em" }} onMouseEnter={enterHandle} onMouseLeave={exitHandle} onClick={clickHandle} >
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
            alignItems: "center"
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
                    <div style={{ ...contst, top: 0, width: "100%" }} key={"top"}>
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
            {(() => { if (!scrolling) return render() })()}
        </div>
    );
}

export default Arrows;
