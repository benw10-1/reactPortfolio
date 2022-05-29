import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Skeleton
} from "@mui/material";
import "./Resume.css"
import { mediaHolder } from "../../utils";

function Resume() {
  const [loading, setLoading] = useState(true)
  const scale = mediaHolder.useSetMedias({
    desktop: 1,
    laptop: .8,
    tablet: .6,
  })
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
        <Paper sx={{ width: 850 * scale, height: "80%", borderRadius: "10px" }} elevation={7}>
          {loading ? <Skeleton variant="rect" animation="wave" width="100%" height="100%" /> : <iframe title="resume" src="/resume" width="100%" height="100%" />}
        </Paper>
      </Box>
    )
  }

  return render()
}

export default Resume;
