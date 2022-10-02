import React, {useEffect} from 'react';
import {getQuestionApi} from './services/quiz_service'

const App = () => {

  useEffect(() => {
    
    async function fetchData() {
      const questions = await getQuestionApi(5, 'easy');
      console.log(questions);
    }
    fetchData();
   
  }, [])
  

  return (
    <div>App</div>
  )
}

export default App