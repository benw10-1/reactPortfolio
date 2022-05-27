import React, { useState, useEffect, useRef } from "react";
import {
  Box, TextField
} from "@mui/material";
import { styled } from "@mui/system";
import "./Connect.css"
import { markUp } from "../../utils";

const StyledName = styled(TextField, { shouldForwardProp: (prop) => true })`
  background: transparent;
  color: #E9C46A;
  & .MuiInput-root {
    width: 450px;
    color: #E9C46A;
    border-bottom-color: #E76F51;
  }
  & .MuiInput-underline:before {
    border-bottom: 1px solid #F4A261;
  }
  & .MuiInput-underline:hover:before {
    border-color: #F4A261;
  }
  & .MuiInput-input {
    border-color: #E76F51;
  }
  & label {
    color: #E9C46A;
  }
  & label.Mui-focused {
    color: #F4A261;
  }
  & .Mui-focused {
    color: #F4A261;
  }
  & .MuiInput-underline:after {
    border-bottom-color: #E76F51;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-bottom-color: #E76F51;
    }
    &:hover fieldset {
      border-bottom-color: #E76F51;
    }
    &.Mui-focused fieldset {
      border-bottom-color: #E76F51;
    }
  }
`
const StyledEmail = styled(TextField, { shouldForwardProp: (prop) => true })`
background: transparent;
color: #E9C46A;
& .MuiInput-root {
  width: 570px;
  color: #E9C46A;
  border-bottom-color: #E76F51;
}
& .MuiInput-underline:before {
  border-bottom: 1px solid #F4A261;
}
& .MuiInput-underline:hover:before {
  border-color: #F4A261;
}
& .MuiInput-input {
  border-color: #E76F51;
}
& label {
  color: #E9C46A;
}
& label.Mui-focused {
  color: #F4A261;
}
& .Mui-focused {
  color: #F4A261;
}
& .MuiInput-underline:after {
  border-bottom-color: #E76F51;
}
& .MuiOutlinedInput-root {
  & fieldset {
    border-bottom-color: #E76F51;
  }
  &:hover fieldset {
    border-bottom-color: #E76F51;
  }
  &.Mui-focused fieldset {
    border-bottom-color: #E76F51;
  }
}
`
const StyledMessage = styled(TextField, { shouldForwardProp: (prop) => true })`
background: transparent;
color: #E9C46A;
& .MuiInput-root {
  width: 700px;
  color: #E9C46A;
  border-bottom-color: #E76F51;
}
& .MuiInput-underline:before {
  border-bottom: 1px solid #F4A261;
}
& .MuiInput-underline:hover:before {
  border-color: #F4A261;
}
& .MuiInput-input {
  border-color: #E76F51;
}
& label {
  color: #E9C46A;
}
& label.Mui-focused {
  color: #F4A261;
}
& .Mui-focused {
  color: #F4A261;
}
& .MuiInput-underline:after {
  border-bottom-color: #E76F51;
}
& .MuiOutlinedInput-root {
  & fieldset {
    border-bottom-color: #E76F51;
  }
  &:hover fieldset {
    border-bottom-color: #E76F51;
  }
  &.Mui-focused fieldset {
    border-bottom-color: #E76F51;
  }
}
`

function Cover({ nextQuote }) {
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
            thisRef.current.style.width = "0"
          }, 250)
        }
        else setTimeout(() => {
          thisRef.current.style.width = "100%"
        }, 4000)
      })
      thisRef.current.style.width = "100%"
    }
  }, [thisRef.current])

  return (
    <div style={slider} ref={thisRef} />
  )
}

function Connect() {
  const quotes = [
    ["If debugging is the process of removing software bugs, then programming must be the process of putting them in.", "Edsger Dijkstra"],
    ["The best way to predict the future is to create it.", "Alan Kay"],
    ["Among three men, one must be a teacher.", "Confucius"],
    ["Success is liking yourself, liking what you do, and liking how you do it.", "Maya Angelou"],
    ["Live as if you were to die tomorrow. Learn as if you were to live forever.", "Mahatma Gandhi"],
    ["Talent wins games, but teamwork and intelligence win championships.", "Michael Jordan"]
  ]

  const [quote, _setQuote] = useState(Math.floor(Math.random() * quotes.length))

  const quoteRef = useRef(quote)

  const quotecont = {
    fontSize: "1.5rem",
    width: "700px",
    position: "absolute",
    top: 0,
    right: 0,
  }
  const quotecontent = {
    fontSize: "1.6rem",
  }
  const quoteby = {
    fontSize: "2rem",
    textAlign: "right",
  }
  const innersx = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }
  const containersx = {
    width: "80%",
    height: "80%",
    display: "grid",
    placeItems: "center",
    position: "relative",
  }
  const messagesx = {
    fontSize: "1.5rem",
    width: "700px",
    position: "absolute",
    bottom: "10%",
    left: 0,
  }
  const formstyle = {
    display: "flex",
    flexDirection: "column",
    fontSize: "1.5rem",
  }

  const setQuote = (i) => {
    _setQuote(i)
    quoteRef.current = i
  }

  const nextQuote = () => {
    setQuote(quoteRef.current + 1 >= quotes.length ? 0 : quoteRef.current + 1)
  }
  const current = quotes[quote]

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
            <Box sx={{ fontSize: "2rem" }}>
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
                '& .MuiTextField-root': { width: "100%", margin: "10px 0", padding: "8px 0", color: "#F4A261" },
              }}
            >
              <StyledName label="Name" name="name" placeholder="Enter your name" required type="text" variant="standard" />
              <StyledEmail label="Email" name="email" placeholder="Enter your email" required type="email" variant="standard" />
              <StyledMessage label="Message" name="message" placeholder="Hi, I like how you styled your portfolio! Let's keep in touch!" required type="text" variant="standard" multiline rows={2} />
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }

  return render()
}

export default Connect;
