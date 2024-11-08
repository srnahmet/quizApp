import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import { Send } from '@mui/icons-material';


function Quiz({ setIsFinish, answers, setAnswers }) {
    const mainTime = 5;
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(mainTime);
    const [examStarted, setExamStarted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const userId = Math.floor(Math.random() * 10) + 1;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => { setQuestions(data.filter(item => item.userId === userId)) });
    }, []);

    // Zamanlayıcı
    useEffect(() => {
        if (timeLeft === 0) {
            handleNextQuestion();
        }
        const timer = setInterval(() => {
            if (timeLeft > 0 && examStarted) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, currentQuestion, questions.length, examStarted]);

    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    const handleNextQuestion = () => {
        setAnswers([...answers, { question: questions[currentQuestion].title, answer: selectedAnswer }]);
        setSelectedAnswer('');
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(mainTime);
    };


    useEffect(() => {
        setExamStarted(true);
    }, []);

    useEffect(() => {
        if ((questions.length > 0) && (currentQuestion > questions.length - 1)) {
            setIsFinish(true)
        };
    }, [currentQuestion]);

    useEffect(() => {
        if (questions.length > 0) setIsLoading(false)
    }, [questions]);

    return (
        <Paper sx={{ padding: 4, width: "50%", minHeight: "20%", textAlign: 'center' }}>
            {
                isLoading
                    ? <CircularProgress />
                    : <>
                        <Typography variant="h4" sx={{ textAlign: "left" }}>Soru {currentQuestion + 1}</Typography>
                        <Typography variant="body1" sx={{ margin: 2 }}>
                            {questions[currentQuestion]?.title}?
                        </Typography>
                        <Divider sx={{ margin: 2 }} />
                        <FormControl component="fieldset" sx={{ textAlign: "left" }}>
                            <FormLabel component="legend" sx={{ margin: 1 }}>Şıklar</FormLabel>
                            <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
                                <FormControlLabel sx={{ padding: 1 }} value="a" control={<Radio />} label={"A-) " + questions[currentQuestion]?.body?.split("\n")[0]} />
                                <FormControlLabel sx={{ padding: 1 }} value="b" control={<Radio />} label={"B-) " + questions[currentQuestion]?.body?.split("\n")[1]} />
                                <FormControlLabel sx={{ padding: 1 }} value="c" control={<Radio />} label={"C-) " + questions[currentQuestion]?.body?.split("\n")[2]} />
                                <FormControlLabel sx={{ padding: 1 }} value="d" control={<Radio />} label={"D-) " + questions[currentQuestion]?.body?.split("\n")[3]} />
                            </RadioGroup>
                        </FormControl>
                        <Divider sx={{ margin: 2 }} />
                        <Button
                            variant="contained"
                            onClick={handleNextQuestion}
                            disabled={!selectedAnswer || timeLeft>20}
                            // disabled={!selectedAnswer}
                            sx={{ bottom: "2px" }}
                            endIcon={<Send />}
                        >
                            Sonraki Soru
                        </Button>
                        <Typography variant="body2" sx={{ marginTop: 2 }} color={timeLeft <= 5 ? "error" : timeLeft <= 10 ? "warning" : "primary"}>
                            {timeLeft} saniye kaldı
                        </Typography>
                    </>
            }
        </Paper>
    )
}

export default Quiz