import { useEffect, useState } from 'react'
import './App.css'
import Overview from './components/Overview/Overview';
import Expanded from './components/Expanded/Expanded';
import { Toolbar } from './components/Toolbar/Toolbar.js';
import hardCodedData from './data.json';

function App() {
  const [section, setSection] = useState('all');
  const [data, setData] = useState([]);

  // TODO: replace with tan stack query
  useEffect(() => {
    setData(hardCodedData);
  }, []);

  return (
    <div className="widget">
      <Toolbar data={data} section={section} setSection={setSection} />
      {
        section === 'all' ? (
          <Overview data={data} setSection={setSection} />
        ) : (
          <Expanded data={data}/>
        )
      }
    </div>
  )
}

export default App
