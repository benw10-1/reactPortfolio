import React from "react";

const iconst = {
    // borderRadius: "500px",
    // display: "block"
    userSelect: "none",
}

function JS() {
    return (
        <img src="/images/javascript.png" width={50} height={50} style={iconst} />
    )
}

function Python() {
    return (
        <img src="/images/python.png" width={50} height={50} style={iconst} />
    )
}

function LinkedIn() {
    return (
        <img src="/images/linkedIn.png" width={50} height={50} style={iconst} />
    )
}

function Me({ style, scale }) {
    const mest = {
        borderRadius: "500px",
        background: "url(/images/me.png)", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover", 
        boxShadow: "0 8px 16px 0 rgb(0 0 0 / 15%)",
        width: `${100 * scale}px`,
        height: `${100 * scale}px`,
        marginBottom: "12.5px"
    }

    return (
        <div style={{...iconst, ...mest, ...style }}></div>
    )
}

function GitHub(props) {
    const { scale } = props

    return (
        <img src="/images/github.png" width={50 * scale} height={50 * scale} style={iconst} {...props} />
    )
}

function Info() {
    return (
        <img src="/images/info.png" width={50} height={50} style={iconst} />
    )
}

export { JS, Python, Me, GitHub, LinkedIn, Info }