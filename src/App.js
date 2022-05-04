import React, { useState, useEffect } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './Hooks/useHttp';

function App() {
  
  const [tasks, setTasks] = useState([]);

  const transformTasks = (taskObj) =>{
    const loadedTasks = []
    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }
    setTasks(loadedTasks);
    }

  const {isLoading, error, sendRequest} = useHttp({url: 'https://moviesapp-10288-default-rtdb.firebaseio.com/tasks.json'}, transformTasks)// los parametros van despues del nombre del hook
  
  useEffect(() => {
    sendRequest()
  }, [])

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
