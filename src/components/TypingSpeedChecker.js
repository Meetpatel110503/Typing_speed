import React, { useState, useEffect, useRef } from "react"
import { Box, Button, Typography } from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { paragraphs } from "../data"
import ResultModal from "./Modal"
import ShowResult from "./ShowResult"

const TypingSpeedChecker = () => {
  const [textToType, setTextToType] = useState(
    paragraphs[Math.floor(Math.random() * paragraphs.length)]
  )
  const [typedText, setTypedText] = useState("")
  const [startTime, setStartTime] = useState(null)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isFinished, setIsFinished] = useState(false)
  const [mistakes, setMistakes] = useState(0)
  const [open, setOpen] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [wordsTyped, setWordsTyped] = useState(0)
  const [correctWords, setCorrectWords] = useState(0)
  const inputRef = useRef(null)

  const words = textToType.split(" ")

  useEffect(() => {
    if (timeLeft > 0 && startTime && !isFinished) {
      const timer = setInterval(
        () => setTimeLeft((timeLeft) => timeLeft - 1),
        1000
      )
      return () => clearInterval(timer)
    } else if (timeLeft === 0 || isFinished) {
      setOpen(true)
    }
  }, [timeLeft, startTime, isFinished])

  const handleKeyDown = (e) => {
    if (!startTime && e.key !== "Enter") {
      setStartTime(new Date())
    }

    if (e.key === " ") {
      const typedWord = typedText.trim()
      if (typedWord === words[currentWordIndex]) {
        setCorrectWords((correctWords) => correctWords + 1)
      } else {
        setMistakes((mistakes) => mistakes + 1)
      }
      setWordsTyped((wordsTyped) => wordsTyped + 1)
      setTypedText("")
      setCurrentWordIndex((index) => index + 1)
      if (currentWordIndex + 1 === words.length) {
        setIsFinished(true)
        setOpen(true)
      }
      e.preventDefault()
    } else if (e.key === "Backspace") {
      if (typedText !== "") {
        setTypedText((text) => text.slice(0, -1))
      }
    } else if (e.key.length === 1) {
      setTypedText((text) => text + e.key)
    }
  }

  const calculateAccuracy = () => {
    if (wordsTyped === 0) {
      return 0
    }
    const totalWords = wordsTyped + (wordsTyped === words.length ? 0 : 1)
    const correctWordsCount = totalWords - mistakes
    return ((correctWordsCount / totalWords) * 100).toFixed(0)
  }

  const handleRestart = () => {
    setTextToType(paragraphs[Math.floor(Math.random() * paragraphs.length)])
    setTypedText("")
    setStartTime(null)
    setTimeLeft(60)
    setIsFinished(false)
    setMistakes(0)
    setCurrentWordIndex(0)
    setWordsTyped(0)
    setCorrectWords(0)
    setOpen(false)
    inputRef.current.focus()
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const renderTextWithHighlights = () => {
    return words.map((word, index) => {
      if (index < currentWordIndex) {
        return (
          <span key={index} style={{ color: "#C0C0C0", marginRight: "5px" }}>
            {word}
          </span>
        )
      } else if (index === currentWordIndex) {
        return (
          <span key={index} style={{ marginRight: "5px" }}>
            {word.split("").map((char, charIndex) => {
              let color = "black"
              if (typedText[charIndex] === char) {
                color = "#007bff"
              } else if (typedText[charIndex] !== undefined) {
                color = "red"
              }
              return (
                <span key={charIndex} style={{ color }}>
                  {char}
                </span>
              )
            })}
          </span>
        )
      } else {
        return (
          <span key={index} style={{ color: "black", marginRight: "5px" }}>
            {word}
          </span>
        )
      }
    })
  }

  const getResultMessage = () => {
    if (correctWords < 25) {
      return {
        emojiLeft: "🐢",
        message: "To slow..!! Your like turtle.",
      }
    } else if (correctWords >= 25 && correctWords <= 34) {
      return {
        emojiLeft: "⏳",
        message: "Not bad! Keep practicing.",
      }
    } else {
      return {
        emojiLeft: "🚀",
        message: "Excellent! You're typing like a pro.",
      }
    }
  }

  const getTimerColor = () => {
    if (timeLeft > 20) {
      return "black"
    } else if (timeLeft > 10) {
      return "green"
    } else {
      return "red"
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 3,
      }}
    >
      <Typography
        variant='body2'
        gutterBottom
        align='center'
        sx={{ color: "gray", fontSize: "16px" }}
      >
        TYPING SPEED TEST
      </Typography>
      <Typography
        gutterBottom
        align='center'
        sx={{ fontWeight: "bold", fontSize: "60px" }}
      >
        Test your typing skills
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        {!startTime && (
          <>
            <Typography variant='h6' sx={{ marginRight: 1, fontSize: "20px" }}>
              Start here:
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: "gray", fontSize: "20px" }}
            >
              {words[currentWordIndex]}
            </Typography>
          </>
        )}
        {startTime && (
          <>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
              <AccessTimeIcon
                sx={{
                  marginRight: "12px",
                  fontSize: "34px",
                  color: getTimerColor(),
                }}
              />
              <Typography
                variant='body1'
                sx={{ color: getTimerColor(), fontSize: "1.3rem" }}
              >
                {timeLeft}s
              </Typography>
            </Box>
          </>
        )}
      </Box>
      <Box sx={{ marginBottom: 2, width: "80%" }}>
        <Typography
          variant='body1'
          sx={{
            fontSize: "1.5rem",
            fontFamily: "Optima, sans-serif",
            backgroundColor: "#fff",
            borderRadius: "5px",
            border: "1px solid #ddd",
            textAlign: "justify",
            maxWidth: "100%",
            overflowWrap: "break-word",
            padding: "20px",
          }}
        >
          {renderTextWithHighlights()}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          marginTop: 2,
        }}
      >
        <input
          ref={inputRef}
          value={typedText}
          onChange={() => {}}
          onKeyDown={handleKeyDown}
          style={{
            position: "absolute",
            left: "-9999px",
          }}
        />
      </Box>
      <ShowResult
        mistakes={mistakes}
        calculateAccuracy={calculateAccuracy}
        correctWords={correctWords}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={handleRestart}
        sx={{ mb: 2, mt: 3 }}
      >
        Try Again
      </Button>
      <ResultModal
        open={open}
        getResultMessage={getResultMessage}
        setOpen={setOpen}
        calculateAccuracy={calculateAccuracy}
        mistakes={mistakes}
        correctWords={correctWords}
        handleRestart={handleRestart}
      />
    </Box>
  )
}

export default TypingSpeedChecker
