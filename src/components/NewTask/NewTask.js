import React, { useState } from 'react';


import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {

  /*const textTransform = (data) => {

      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: props.taskText };

      props.onAddTask(createdTask);

  }

  const { isLoading, error, sendRequest } = useHttp(
    {url: 'https://moviesapp-10288-default-rtdb.firebaseio.com/tasks.json', 
    method: 'POST',
    body: JSON.stringify({ text: props.taskText }),
    headers: {
      'Content-Type': 'application/json',
    },
  }, textTransform
  )*/



  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterTaskHandler = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://moviesapp-10288-default-rtdb.firebaseio.com/tasks.json',
        {
          method: 'POST',
          body: JSON.stringify({ text: taskText }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
