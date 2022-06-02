import React, { useState, useEffect, useRef } from "react";
import {
  Box, Button, TextField
} from "@mui/material";
import "./Connect.css"
import { markUp, mediaHolder } from "../../utils";

function Cover({ nextQuote, children }) {
  const [display, setDisplay] = useState(true)

  const slider = {
    width: 0,
    height: "100%",
    backgroundColor: "#264653",
    transition: "width 1s ease-in",
    position: "absolute",
    right: "0",
    padding: "0 0 0 10px",
    display: display ? "block" : "none",
    // overflow: "visible"
    // justifyContent: "right",
    // whiteSpace: "nowrap",
  }
  const thisRef = useRef(null)

  useEffect(() => {
    if (thisRef.current) {
      thisRef.current.addEventListener("transitionend", (event) => {
        if (event.propertyName !== "width") return
        setDisplay(false)
        nextQuote()
        thisRef.current.style.width = "0"
      })
      setInterval(() => {
        setDisplay(true)
        setTimeout(() => { thisRef.current.style.width = "100%" }, 100)
      }, 5000)
      thisRef.current.style.width = "100%"
    }

  }, [])

  return (
    <div style={slider} ref={thisRef}>
      {children}
    </div>
  )
}

function Connect({ isMobile }) {
  const quotes = [
    ["If debugging is the process of removing software bugs, then programming must be the process of putting them in.", "Edsger Dijkstra"],
    ["The best way to predict the future is to create it.", "Alan Kay"],
    ["Among three men, one must be a teacher.", "Confucius"],
    ["Success is liking yourself, liking what you do, and liking how you do it.", "Maya Angelou"],
    ["Live as if you were to die tomorrow. Learn as if you were to live forever.", "Mahatma Gandhi"],
    ["Talent wins games, but teamwork and intelligence win championships.", "Michael Jordan"]
  ]

  const scale = mediaHolder.useSetMedias({
    desktop: 1,
    laptop: .8,
    tablet: .6,
    mobile: .4,
    mobileL: .3,
  })

  const [quote, _setQuote] = useState(Math.floor(Math.random() * quotes.length))

  const quoteRef = useRef(quote)

  const innersx = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }
  const containersx = {
    width: isMobile ? "100%" : "80%",
    height: mediaHolder.useSetMedias({
      desktop: "85%",
      tablet: "80%",
      mobile: "75%",
      laptop: "70%",
      mobile: "60%",
      mobileL: "50%"
    }),
    display: "grid",
    placeItems: "center",
    position: "relative",
  }
  const quotecont = {
    width: `${700 * scale}px`,
    position: "absolute",
    top: 0,
    right: isMobile ? "50%" : "0",
    transform: isMobile ? "translateX(50%)" : "0",
    overflow: "hidden",
    height: `${13 * scale}em`,
  }
  const quotecontent = {
    fontSize: `${scale * 1.6}rem`,
  }
  const quoteby = {
    fontSize: `${scale * 2}rem`,
    textAlign: "right",
  }
  const messagesx = {
    fontSize: `${scale * 1.5}rem`,
    width: `${800 * scale}px`,
    position: "absolute",
    bottom: 0,
    left: isMobile ? "50%" : "0",
    transform: isMobile ? "translateX(-50%)" : "0"
  }
  const formstyle = {
    display: "flex",
    flexDirection: "column",
    fontSize: `${scale * 1.5}rem`,
    marginTop: "10px"
  }

  const setQuote = (i) => {
    _setQuote(i)
    quoteRef.current = i
  }

  const nextQuote = () => {
    setQuote(quoteRef.current + 1 >= quotes.length ? 0 : quoteRef.current + 1)
  }
  const getNextQuote = () => {
    return quoteRef.current + 1 >= quotes.length ? 0 : quoteRef.current + 1
  }
  const current = quotes[quote]
  const next = quotes[getNextQuote()]

  const shortsx = {
    width: "45%",
  }

  const textFieldSX = {
    margin: `${scale * 10}px 0`,
    padding: `${scale * 8}px 0`,
    "& .MuiInput-root": {
      width: "100%",
      fontSize: `${scale * 1}rem`,
      fontFamily: "ff-tisa-sans-web-pro, sans-serif",
      color: "#E9C46A",
      "&:before": {
        borderBottom: "1px solid #F4A261",
      },
      "&:hover:before": {
        borderColor: "#F4A261"
      },
    },
    "& .short": shortsx,
    "& .Mui-focused": {
      color: "#F4A261"
    },
    "& label": {
      color: "#E9C46A",
      fontSize: `${scale * 1}rem`,
      fontFamily: "ff-tisa-sans-web-pro, sans-serif",
    },
    "& label.Mui-focused": {
      color: "#F4A261"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#E76F51"
    },
  }
  const buttonSX = {
    width: `${scale * 320}px`,
    borderRadius: 0,
    padding: `${scale * 10}px`,
    backgroundColor: "trasparent",
    fontSize: `${scale * 1}rem`,
    borderColor: "#F4A261",
    color: "#F4A261",
    margin: `${scale * 10}px 0`,
    fontFamily: "ff-tisa-sans-web-pro, sans-serif",
    "&:hover": {
      borderColor: "#E76F51",
      color: "#E76F51",
    }
  }

  const render = () => {
    return (
      <Box sx={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
        <Box sx={containersx} >
          <Box sx={quotecont}>
            <Cover nextQuote={nextQuote}>
              <Box sx={{ ...innersx, width: quotecont.width }}>
                <div style={quotecontent} dangerouslySetInnerHTML={markUp("“" + (next?.[0] ?? "") + "”")} />
                <div style={quoteby} dangerouslySetInnerHTML={markUp("<span style='font-weight: bolder; font-size: larger;'>- </span>" + (next?.[1] ?? ""), [(next?.[1] ?? "\\\\\\\\")])} />
              </Box>
            </Cover>
            <Box sx={innersx}>
              <div style={quotecontent} dangerouslySetInnerHTML={markUp("“" + (current?.[0] ?? "") + "”")} />
              <div style={quoteby} dangerouslySetInnerHTML={markUp("<span style='font-weight: bolder; font-size: larger;'>- </span>" + (current?.[1] ?? ""), [(current?.[1] ?? "\\\\\\\\")])} />
            </Box>
          </Box>
          <Box sx={messagesx}>
            <Box sx={{ fontSize: `${scale * 2}rem` }}>
              <strong>Send me a message<span className="punc">!</span></strong>
            </Box>
            <Box
              component={"form"}
              autoComplete={"off"}
              action={"https://formspree.io/f/xrgjlrvb"}
              method={"POST"}
              target={"_blank"}
              sx={{
                ...formstyle,
                '& .MuiTextField-root': textFieldSX,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                <TextField label="Name" name="name" placeholder="Enter your name" required type="text" variant="standard" sx={shortsx} />
                <TextField label="Email" name="email" placeholder="Enter your email" required type="email" variant="standard" sx={shortsx} />
              </Box>
              <TextField label="Message" name="message" placeholder="Hi, I like how you styled your portfolio! Let's keep in touch!" required type="text" variant="standard" multiline rows={2} />
              <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Button type="submit" variant="outlined" sx={buttonSX}>Send</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }

  return render()
}

export default Connect;
