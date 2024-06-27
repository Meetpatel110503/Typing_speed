import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, Typography, Menu, MenuItem, Grid } from "@mui/material"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

const LandingPage = () => {
  const navigate = useNavigate()

  const [anchorElDifficulty, setAnchorElDifficulty] = useState(null)
  const [anchorElTimer, setAnchorElTimer] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState("low")
  const [selectedTimer, setSelectedTimer] = useState(60)

  const handleDifficultyClick = (event) => {
    setAnchorElDifficulty(event.currentTarget)
  }

  const handleDifficultyClose = (difficulty) => {
    setAnchorElDifficulty(null)
    if (difficulty) {
      setSelectedDifficulty(difficulty)
    }
  }

  const handleTimerClick = (event) => {
    setAnchorElTimer(event.currentTarget)
  }

  const handleTimerClose = (timer) => {
    setAnchorElTimer(null)
    if (timer) {
      setSelectedTimer(timer)
    }
  }

  const handleStart = () => {
    navigate(`/typing-test/${selectedDifficulty}?timer=${selectedTimer}`)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "95vh",
        backgroundColor: "#f7f9f5",
        padding: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: { lg: "900px", md: "800px", sm: "460px", xs: "260px" },
          height: { lg: "460px", md: "420px", sm: "420px", xs: "400px" },
          backgroundColor: "white",
          boxShadow: 3,
          borderRadius: 4,
          padding: 5,
          textAlign: "center",
          position: "relative",
        }}
      >
        <Typography
          gutterBottom
          align='center'
          sx={{
            fontWeight: "bold",
            fontSize: { lg: "60px", md: "50px", sm: "40px", xs: "35px" },
          }}
        >
          Check your typing skills
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            fontStyle: "italic",
            mb: "20px",
          }}
          gutterBottom
        >
          Select your test:
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent='center'
          sx={{ marginBottom: 4 }}
        >
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={handleDifficultyClick}
              endIcon={<ArrowDropDownIcon />}
            >
              Difficulty: {selectedDifficulty}
            </Button>
            <Menu
              anchorEl={anchorElDifficulty}
              open={Boolean(anchorElDifficulty)}
              onClose={() => handleDifficultyClose(null)}
              sx={{ margin: "5px 0px" }}
            >
              <MenuItem
                onClick={() => handleDifficultyClose("low")}
                sx={{ fontSize: "18px" }}
              >
                Low
              </MenuItem>

              <MenuItem
                onClick={() => handleDifficultyClose("medium")}
                sx={{ fontSize: "18px" }}
              >
                Medium
              </MenuItem>
              <MenuItem
                onClick={() => handleDifficultyClose("hard")}
                sx={{ fontSize: "18px" }}
              >
                Hard
              </MenuItem>
            </Menu>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={handleTimerClick}
              endIcon={<ArrowDropDownIcon />}
            >
              Timer: {selectedTimer} sec
            </Button>
            <Menu
              anchorEl={anchorElTimer}
              open={Boolean(anchorElTimer)}
              onClose={() => handleTimerClose(null)}
              sx={{ margin: "5px 0px" }}
            >
              <MenuItem
                onClick={() => handleTimerClose(30)}
                sx={{ fontSize: "18px" }}
              >
                30 seconds
              </MenuItem>
              <MenuItem
                onClick={() => handleTimerClose(60)}
                sx={{ fontSize: "18px" }}
              >
                1 minute
              </MenuItem>
              <MenuItem
                onClick={() => handleTimerClose(120)}
                sx={{ fontSize: "18px" }}
              >
                2 minutes
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
        <Button variant='contained' color='secondary' onClick={handleStart}>
          Start Test
        </Button>
        <Box
          component='img'
          src='./assets/typing_girl.svg'
          sx={{
            position: "absolute",
            bottom: -60,
            left: 10,
            width: { lg: "120px", md: "120px", sm: "90px", xs: "0px" },
          }}
        />
        <Box
          component='img'
          src='./assets/typing_boy.svg'
          sx={{
            position: "absolute",
            bottom: -10,
            right: -20,
            width: { lg: "220px", md: "220px", sm: "180px", xs: "0px" },
          }}
        />
      </Box>
    </Box>
  )
}

export default LandingPage
