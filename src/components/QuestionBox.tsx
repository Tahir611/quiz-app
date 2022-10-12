import React, { useState, useEffect } from 'react';
import './QuestionBox.css';
import { QuestionPropsType } from '../types/question_type';
import { getQuestionApi } from '../services/quiz_service'
import { QuestionType } from '../types/question_type';

const QuestionBox: React.FC<QuestionPropsType> = ({ options, question, callback, score, questionNum }) => {
   let [selected, setSelected] = useState('');
   let [quiz, setQuiz] = useState<QuestionType[]>([]);
   let [start, setStart] = useState<boolean>(false);
   const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(e.target.value)
   }

   const startQuiz = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setStart(true);
   }

   useEffect(() => {

      async function fetchData() {
         const questions: QuestionType[] = await getQuestionApi(5, 'easy');
         console.log(questions);
         setQuiz(questions);
      }
      fetchData();

   }, [])
   // console.log(question, options)
   return (
      <>
         {quiz.length ?

            (
               <div>
                  <button className='btn' onClick={startQuiz}>Start quiz</button>
               </div>
            ) : null
         }

         {start ?

            (<div>
               <div className='question-container'>
                  <div className='question'>
                     <h4>
                        Question No: {questionNum} / {quiz.length}
                     </h4>
                     <h3>
                     {question}
                     </h3>
                  </div>
                  <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selected)}>
                     {
                        options.map((opt: string, i: number) => {
                           //  {console.log(opt, selected)}
                           return (
                              <div key={i}>
                                 <label>
                                    <input name='option' value={opt} type = 'radio' required checked={selected === opt} onChange={handleSelection} />
                                   {opt}
                                 </label>
                              </div>
                           )
                        })
                     }
                     <input type="submit" />
                  </form>
                  
               </div>
               <div>
                     <h1>
                        Your score: {score}
                     </h1>
                  </div>
            </div>) : null
         }

      </>


   )
}

export default QuestionBox