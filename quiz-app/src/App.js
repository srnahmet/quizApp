import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answered, setAnswered] = useState(false);

  // Veriyi çekme
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setQuestions(data.slice(0, 10))); // İlk 10 soruyu al
  }, []);

  // Zamanlayıcı
  useEffect(() => {
    if (timeLeft === 0) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30); // Her soru için 30 saniye süre
        setAnswered(false);
      } else {
        alert('Quiz bitti!');
      }
    }
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentQuestion, questions.length]);

  return (
    <Box sx={{ padding: 2 }}>
      {questions.length > 0 && (
        <>
          <Typography variant="h5">{questions[currentQuestion].title}</Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {questions[currentQuestion].body}
          </Typography>
          <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="contained"
              onClick={() => setAnswered(true)}
              disabled={timeLeft < 10} // 10 saniye önce şıklara tıklanamaz
            >
              Cevapla
            </Button>
          </Box>
          <Typography variant="body2">{timeLeft} saniye kaldı</Typography>
        </>
      )}
    </Box>
  );
}

export default App;
