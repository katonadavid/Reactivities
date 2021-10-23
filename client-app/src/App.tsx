import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    axios.get<any>('http://localhost:5000/api/activities').then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, []);

  return (
    <div className="App">
      <ul>
        {activities.map(activitiy => {
          return <li><span>{activitiy.title}</span><p>{activitiy.description}</p></li>
        })}
      </ul>
    </div>
  );
}

export default App;
