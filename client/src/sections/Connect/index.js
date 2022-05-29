import React, { useState, useEffect, useRef } from "react";
import {
  Box, Button, TextField
} from "@mui/material";
import "./Connect.css"
import { markUp, mediaHolder } from "../../utils";

function Cover({ nextQuote, isMobile }) {
  const [interval, _setInterval] = useState(null)

  const slider = {
    width: 0,
    height: "100%",
    backgroundColor: "#264653",
    transition: "all 1s ease-in",
    position: "absolute",
  }
  const thisRef = useRef(null)

  useEffect(() => {
    if (thisRef.current) {
      thisRef.current.addEventListener("transitionend", () => {
        if (thisRef.current.style.width === "100%") {
          nextQuote()
          setTimeout(() => {
            if (thisRef.current) thisRef.current.style.width = "0"
          }, 250)
        }
        else setTimeout(() => {
          if (thisRef.current) thisRef.current.style.width = "100%"
        }, 4000)
      })
      thisRef.current.style.width = "100%"
    }
  }, [thisRef.current])

  return (
    <div style={slider} ref={thisRef} />
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
    transform: isMobile ? "translateX(50%)" : "0"
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
  }

  const setQuote = (i) => {
    _setQuote(i)
    quoteRef.current = i
  }

  const nextQuote = () => {
    setQuote(quoteRef.current + 1 >= quotes.length ? 0 : quoteRef.current + 1)
  }
  const current = quotes[quote]

  const textFieldSX = { 
    width: "100%", 
    margin: `${scale * 10}px 0`, 
    padding: `${scale * 8}px 0`,
    "& .MuiInput-root": {
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

  const nameSX = {
    "& .MuiInput-root": {
      ...textFieldSX["& .MuiInput-root"],
      width: "45%"
    }
  }
  const emailSX = {
    "& .MuiInput-root": {
      ...textFieldSX["& .MuiInput-root"],
      width: "65%"
    }
  }
  const buttonSX = {
    width: "45%",
    borderRadius: "10px",
    padding: `${scale * 10}px`,
    backgroundColor: "trasparent",
    fontSize: `${scale * 1}rem`,
    borderColor: "#E9C46A",
    color: "#E9C46A",
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
            <Cover nextQuote={nextQuote} />
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
              <TextField label="Name" name="name" placeholder="Enter your name" required type="text" variant="standard" sx={nameSX} />
              <TextField label="Email" name="email" placeholder="Enter your email" required type="email" variant="standard" sx={emailSX} />
              <TextField label="Message" name="message" placeholder="Hi, I like how you styled your portfolio! Let's keep in touch!" required type="text" variant="standard" multiline rows={2} />
              <Box >
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
