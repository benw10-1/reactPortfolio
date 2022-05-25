import React, { useState, useEffect } from "react";
import { scroller } from "../../utils";
import "./Logo.css"

function Logo({ sel: [selected, select], scrollers: [scrolling, setScrolling] }) {
    const [animating, setAnimating] = useState(true)
    
    const clickHandle = (event) => {
        if (selected !== "INTRO") {
            setScrolling(true)
            scroller.scrollToEl(document.getElementById("INTRO")).then(() => {setScrolling(false)})
            select("INTRO")
        }
        setAnimating(false)
        setTimeout(() => {
            setAnimating(true)
        }, 150)
    }

    const render = () => {
        return (
            <div style={{ position: "fixed", top: "20px", left: "20px", width: 200, height: 100, cursor: "pointer" }} onClick={clickHandle}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-51.616 -29.968 103.6 53.6">
                    <path className={animating ? "animate" : ""} d="m -47.616 19.632 l 12.96 -45.6 m -12.96 45.6 q 11.52 -45.6 27.84 -41.28 q 11.52 3.84 -10.56 18.24 q 11.04 -2.4 12.96 3.84 q 1.92 12.96 -16.8 17.28 q -6.72 0.96 -6.72 -2.4 q -0.48 -3.84 7.2 -6.24 q 4.8 -1.44 12 1.92 q 6.24 4.32 10.08 4.32 q 4.8 0 6.72 -3.84 m 9.6 -33.6 c 0 13.92 0.96 26.88 3.36 40.8 c -2.88 -17.76 4.8 -30.72 7.68 -33.6 c 0 12.48 1.92 22.08 4.32 33.6 c -6.72 -22.08 16.32 -39.84 23.04 -36.96 c 15.36 7.2 -10.56 25.44 -8.64 10.56" stroke="#E76F51" strokeWidth="4" fill="none" id="logo" />
                </svg>
            </div>
        )
    }

    return (
        <React.Fragment>
            {render()}
        </React.Fragment>
    );
}

export default Logo;
