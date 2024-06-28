import { Box, CircularProgress, Typography } from "@mui/material"
import React from "react"

export default function Loader() {
  return (
    <div>
      <Box sx={{ mt: "400px" }}>
        <Typography sx={{ textAlign: "center" }}>
          {" "}
          <CircularProgress />
        </Typography>
      </Box>
    </div>
  )
}
