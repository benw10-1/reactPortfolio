import React, { useState, useEffect } from "react";
import { 
  Box, Paper,
} from "@mui/material";
import "./Resume.css"

function Resume() {
  const render = () => {
    return (
      <Box sx={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
        <Paper sx={{ width: "850px", height: "80%", borderRadius: "10px" }} elevation={7}>
          <iframe src="/resume" width={"100%"} height={"100%"}/>
        </Paper>
      </Box>
    )
  }

  return render()
}

export default Resume;
