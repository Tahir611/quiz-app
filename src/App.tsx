import React, {useEffect, useState} from 'react';
import {getQuestionApi} from './services/quiz_service'
import { QuestionType } from './types/question_type';
import QuestionBox from './components/QuestionBox';
import './App.css'

const App = () => {
  let [quiz, setQuiz] = useState<QuestionType[]>([]);
  let [currentStep, setCurrentStep] = useState(0);
  let [score, setScore] = useState<number>(0);
  let [questionNum, setQuestionNum] = useState<number>(1);
  // let [totalQuestionNumber, setTotalQuestionNumber] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();
    // console.log(userAns)
    setQuestionNum(++questionNum);
    const currentQuestion: QuestionType = quiz[currentStep];
    console.log('correct answer: ' + currentQuestion.answer  + ' & user answer: ' + userAns)
    if(userAns === currentQuestion.answer){
      setScore(++score);
    }
    // console.log(currentQuestion);
    if(currentStep !== quiz.length -1)
    setCurrentStep(++currentStep);
    else{
    alert(`Your score is ${score} out of ${quiz.length}`)
    setCurrentStep(0);
    setScore(0);
    setQuestionNum(1);
    }

   
  }

  useEffect(() => {
    
    async function fetchData() {
      const questions: QuestionType[] = await getQuestionApi(5, 'easy');
      console.log(questions);
      setQuiz(questions);
    }
    fetchData();
   
},[])
  
if(!quiz.length)
return <h1>Loading...</h1>

  return (
    <div className='App'>
      <QuestionBox options = {quiz[currentStep].option} question = {quiz[currentStep].question} callback = {handleSubmit} score = {score} questionNum = {questionNum} />
    </div>
  )
}

export default App