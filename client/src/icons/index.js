import { Box } from "@mui/material";
import React from "react";

const iconst = {
    // borderRadius: "500px",
    // display: "block"
    userSelect: "none",
}

function JS() {
    return (
        <img src="/images/javascript.webp" width={50} height={50} style={iconst} alt="js" />
    )
}

function Python() {
    return (
        <img src="/images/python.webp" width={50} height={50} style={iconst} alt="python" />
    )
}

function LinkedIn() {
    return (
        <img src="/images/linkedIn.webp" width={50} height={50} style={iconst} alt="linkedIn" />
    )
}

function Me({ style }) {
    const mest = {
        borderRadius: "500px",
        background: "url(/images/me.webp)", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover", 
        boxShadow: "0 8px 16px 0 rgb(0 0 0 / 15%)",
        width: `${100 * 1}px`,
        height: `${100 * 1}px`,
        marginBottom: "12.5px"
    }

    return (
        <div style={{...iconst, ...mest, ...style }}></div>
    )
}

function GitHub(props) {

    return (
        <Box sx={{
            width: {
                xs: `${100/6}px`,
                sm: "25px",
                md: `${200/6}px`,
                lg: "50px",
                xl: `${350/6}px`,
            },
            height: {
                xs: `${100/6}px`,
                sm: "25px",
                md: `${200/6}px`,
                lg: "50px",
                xl: `${350/6}px`,
            },
            bottom: "10%", 
            position: "absolute"
        }}>
            <img src="/images/github.webp" width={"100%"} height={"100%"} style={iconst} {...props} alt="github" />
        </Box>
    )
}

function Info() {
    return (
        <img src="/images/info.webp" width={50} height={50} style={iconst} alt="info" />
    )
}

export { JS, Python, Me, GitHub, LinkedIn, Info }