import React from "react"
import {
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
  Grid,
  Divider,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const ResultModal = ({
  open,
  setOpen,
  calculateAccuracy,
  mistakes,
  correctWords,
  handleRestart,

  timer,
}) => {
  const getResultMessage = () => {
    if (correctWords < 20) {
      return {
        emojiLeft: "🐌",
        message:
          "Your typing speed is too slow. You need to improve your speed!",
      }
    } else if (correctWords < 25) {
      return {
        emojiLeft: "🐢",
        message:
          "Your typing speed is quite slow. Keep practicing to improve your speed!",
      }
    } else if (correctWords < 35) {
      return {
        emojiLeft: "🐇",
        message:
          "Nice,You're doing well, but needed little improvement. Keep going!",
      }
    } else {
      return {
        emojiLeft: "🚀",
        message: "Amazing! You type like a pro. Keep up the great work!",
      }
    }
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          maxWidth: 400,
          backgroundColor: "#fff",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          borderRadius: "8px",
        }}
      >
        <IconButton
          aria-label='close'
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "grey",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          sx={{ fontSize: "30px", fontWeight: "Bold", marginBottom: 3 }}
          gutterBottom
        >
          Result
          <Divider />
        </Typography>

        <Grid container spacing={2} alignItems='center' justifyContent='center'>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontSize: "100px" }}>
              {getResultMessage().emojiLeft}
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography sx={{ fontSize: "20px", fontWeight: "Bold", mb: 2 }}>
              {getResultMessage().message}
            </Typography>
            <Typography variant='body1' sx={{ mb: 2 }}>
              Accuracy: {calculateAccuracy()}%
            </Typography>
            <Typography variant='body1' sx={{ mb: 2 }}>
              Mistakes: {mistakes}
            </Typography>
            <Typography variant='body1' sx={{ mb: 2 }}>
              Words per {timer / 60} min: {correctWords}
            </Typography>
            <Button variant='contained' color='primary' onClick={handleRestart}>
              Try Again
            </Button>
            <Button
              variant='outlined'
              color='primary'
              sx={{ ml: 3 }}
              onClick={() => setOpen(false)}
            >
              cancle
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ResultModal
