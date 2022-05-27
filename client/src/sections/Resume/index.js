import React, { useState, useEffect } from "react";
import { 
  Box, 
  Paper,
  Skeleton
} from "@mui/material";
import "./Resume.css"

function Resume() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/resume").then(res => res.headers).then(headers => {
      if (headers.get("Content-Type").split(";")[0] === "application/pdf") {
        setLoading(false)
      }
    })
  }, [])


  const render = () => {
    return (
      <Box sx={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
        <Paper sx={{ width: "850px", height: "80%", borderRadius: "10px" }} elevation={7}>
          {loading ? <Skeleton variant="rect" animation="wave" width="100%" height="100%" /> : <iframe src="/resume" width="100%" height="100%" />}
        </Paper>
      </Box>
    )
  }

  return render()
}

export default Resume;
