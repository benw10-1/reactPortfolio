import React, { useState, useEffect, useRef } from "react";
import { scroller, clamp } from "../utils";
import "./Arrow.css"

function Arrows({ selectHandle: [selected, setSelected], layout, scroller: [scrolling, setScrolling] }) {
    let timeout

    const goToEl = (id) => {
        setScrolling(true)
        setSelected(id)
        id = id.replace(" ", "")
        let el = document.getElementById(id)
        scroller.scrollToEl(el).then(() => {setScrolling(false)})
    }

    const enterHandle = (event) => {
        document.querySelectorAll(".animate-text").forEach(x => x.classList.remove("animate-text"))
        let sel
        if (event.target.className === "arrow-cont") sel = event.target
        else sel = event.target.parentElement
        sel.classList.add("animate-text")
        timeout = setTimeout(() => {goToEl(sel.children.item(1).innerHTML)}, 750)
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
        setSelected(sel)
        goToEl(sel)
    }

    const render = () => {
        if (scrolling) return
        const contst = {
            display: "flex",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center"
        }

        function Txt({ text, transform, place="tb" }) {
            const newRef = useRef()
            const [width, setWidth] = useState(0)
            const [height, setHeight] = useState(0)

            useEffect(() => {
                setWidth(newRef?.current?.clientWidth ?? 0)
                setHeight(newRef?.current?.clientHeight ?? 0)
            }, [])

            if (place === "left") transform = " translateX(-" + (width/2 - height/2) + "px)" + transform
            if (place === "right") transform = " translateX(" + (width/2 - height/2) + "px)" + transform

            return (
                <div className="arrow-cont" style={{ transform }} onMouseEnter={enterHandle} onMouseLeave={exitHandle} onClick={clickHandle} ref={newRef}>
                    <div style={{ display: "block" }}>^</div>
                    <div style={{ display: "block" }}>{text}</div>
                </div>
            )
        }

        const arrows = []
        for (let r = 0; r < layout.length; r++) {
            let row = layout[r]
            let found = false
            for (let c = 0; c < row.length; c++) {
                if (row[c] !== selected) continue

                let [left, right, top, bottom] = [layout[r][c - 1], layout[r][c + 1], layout[r - 1]?.[c], layout[r + 1]?.[c]]

                if (left) arrows.push((
                    <div style={{ ...contst, left: 0, height: "100%", flexDirection: "column"}} key={"left"}>
                        <Txt text={left} transform={"rotateZ(-90deg)"} place={"left"} />
                    </div>))
                if (right) arrows.push((
                    <div style={{ ...contst, right: 0, height: "100%", flexDirection: "column"}} key={"right"}>
                        <Txt text={right} transform={"rotateZ(90deg)"} place={"right"} />
                    </div>))
                if (top) arrows.push(<div style={{ ...contst, top: 0, width: "100%" }} key={"top"}><Txt text={top} /></div>)
                if (bottom) arrows.push(<div style={{ ...contst, bottom: 0, width: "100%" }} key={"bottom"}><Txt transform={"rotateZ(180deg)"} text={bottom} /></div>)

                found = true
                break
            }
            if (found) break
        }

        return arrows
    }

    return (
        <React.Fragment>
            {render()}
        </React.Fragment>
    );
}

export default Arrows;
