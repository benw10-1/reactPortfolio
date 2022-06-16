import React, { useState, useEffect, useRef } from "react";
import {
  Box, Button, TextField
} from "@mui/material";
import "./Connect.css"
import { markUp, mediaHolder } from "../../utils";

function Cover({ nextQuote, children, coverWidth }) {
  const [display, setDisplay] = useState(true)
  const [thisEl, setThisEl] = useState(null)
  const intervalRef = useRef()

  const slider = {
    width: 0,
    height: "100%",
    backgroundColor: "#264653",
    transition: display ? "width 1s ease-in" : "none",
    position: "absolute",
    right: "0",
    padding: "0 0 0 10px",
    display: display ? "block" : "none",
  }

  useEffect(() => {
    if (thisEl) {
      thisEl.addEventListener("transitionend", (event) => {
        if (event.propertyName !== "width") return
        setDisplay(false)
        nextQuote()
        thisEl.style.width = "0"
      })
      clearInterval(intervalRef.current)
      console.log("Effect")
      intervalRef.current = setInterval(() => {
        setDisplay(true)
        setTimeout(() => { if (thisEl?.style) { thisEl.style.width = "100%" } }, 100)
      }, 5000)
      thisEl.style.width = "100%"
    }

  }, [thisEl])

  return (
    <div style={slider} ref={setThisEl}>
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

  const [quote, _setQuote] = useState(Math.floor(Math.random() * quotes.length))
  const [coverWidth, setCoverWidth] = useState(0)

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
    height: {
      xs: "60%",
      sm: "70%",
      md: "80%",
    },
    display: "grid",
    placeItems: "center",
    position: "relative",
  }
  const quotecont = {
    width: {
      xs: "80%",
      sm: "400px",
      md: "700px",
    },
    position: "absolute",
    top: 0,
    right: isMobile ? "50%" : "0",
    transform: isMobile ? "translateX(50%)" : "0",
    overflow: "hidden",
    height: {
      xs: "180px",
      sm: "220px",
      md: "260px",
      lg: "300px",
    },
  }
  const quotecontent = {
    fontSize: {
      xs: "16px",
      sm: "24px",
      md: "32px",
      lg: "40px",
    },
  }
  const quoteby = {
    fontSize: {
      xs: "24px",
      sm: "32px",
      md: "40px",
      lg: "48px",
    },
    textAlign: "right",
  }
  const messagesx = {
    width: {
      xs: "100%",
      sm: "70%",
    },
    minWidth: "fit-content",
    position: "absolute",
    bottom: 0,
    left: isMobile ? "50%" : "0",
    transform: isMobile ? "translateX(-50%)" : "0"
  }
  const formstyle = {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
    padding: {
      xs: "0 10px",
      sm: "0",
    }
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
    padding: {
      xs: "8px 0",
      sm: "12px 0",
      md: "16px 0",
    },
    "& .MuiInput-root": {
      width: "100%",
      fontSize: {
        xs: "20px",
        sm: "24px",
        md: "28px",
        lg: "32px",
      },
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
      fontSize: {
        xs: "20px",
        sm: "24px",
        md: "28px",
        lg: "32px",
      },
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
    width: "25%",
    borderRadius: 0,
    padding: "6px 0",
    backgroundColor: "trasparent",
    fontSize: {
      xs: "14px",
      sm: "16px",
      md: "18px",
      lg: "20px",
    },
    borderColor: "#F4A261",
    color: "#F4A261",
    margin: "10px 0",
    fontFamily: "ff-tisa-sans-web-pro, sans-serif",
    "&:hover": {
      borderColor: "#E76F51",
      color: "#E76F51",
    }
  }

  return (
    <Box sx={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
      <Box sx={containersx} >
        <Box sx={quotecont}>
          <Cover nextQuote={nextQuote} coverWidth={coverWidth}>
            <Box sx={{ ...innersx, width: coverWidth }}>
              <Box sx={quotecontent} dangerouslySetInnerHTML={markUp("“" + (next?.[0] ?? "") + "”")} />
              <Box sx={quoteby} dangerouslySetInnerHTML={markUp("<span style='font-weight: bolder; font-size: larger;'>- </span>" + (next?.[1] ?? ""), [(next?.[1] ?? "\\\\\\\\")])} />
            </Box>
          </Cover>
          <Box sx={innersx} ref={(ref) => {if (ref) {
            setCoverWidth(ref.offsetWidth)
          }}}>
            <Box sx={quotecontent} dangerouslySetInnerHTML={markUp("“" + (current?.[0] ?? "") + "”")} />
            <Box sx={quoteby} dangerouslySetInnerHTML={markUp("<span style='font-weight: bolder; font-size: larger;'>- </span>" + (current?.[1] ?? ""), [(current?.[1] ?? "\\\\\\\\")])} />
          </Box>
        </Box>
        <Box sx={messagesx}>
          <Box sx={{ fontSize: {
            xs: "28px",
            sm: "32px",
            md: "36px",
            lg: "40px",
          }, display: "flex", justifyContent: {
            xs: "center",
            sm: "start",
          } }}>
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

export default Connect;
