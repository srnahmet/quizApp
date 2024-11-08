import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import StartButton from "./components/startButton";
import Quiz from "./components/quiz";
import FinishTable from "./components/finishTable";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [answers,setAnswers] = useState([]);

  useEffect(()=>{
    console.log(answers)
  },[isFinish])
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        backgroundColor:"rgba(25,118,210,0.3)"
      }}
    >
      {!isStart && <StartButton setIsStart={setIsStart} />}
      {isStart && !isFinish && <Quiz setIsFinish={setIsFinish} answers={answers} setAnswers={setAnswers} />}
      {isFinish && <FinishTable answers={answers}/>}
    </Box>
  );
}

export default App;
