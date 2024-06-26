import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const ShowResult = ({mistakes,calculateAccuracy,correctWords}) => {
  return (
    <>
       <Box
        sx={{
          marginBottom: 2,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} sm={4}>
            <Typography
              variant='body1'
              sx={{ textAlign: "center", fontSize: "1.3rem" }}
            >
              Mistakes:
              <span style={{ fontWeight: "bold" }}> {mistakes}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant='body1'
              sx={{
                textAlign: "center",
                fontSize: "1.3rem",
              }}
            >
              Accuracy:{" "}
              <span style={{ fontWeight: "bold" }}>{calculateAccuracy()}%</span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant='body1'
              sx={{
                textAlign: "center",
                fontSize: "1.3rem",
              }}
            >
              WPM: <span style={{ fontWeight: "bold" }}>{correctWords}</span>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ShowResult
