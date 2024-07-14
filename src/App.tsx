import { useEffect, useState } from 'react'
import './App.css'
import Overview from './components/Overview/Overview';
import Expanded from './components/Expanded/Expanded';
import { Toolbar } from './components/Toolbar/Toolbar';
import hardCodedData from './data.json';
import { Platform } from './Types';

function App() {
  const [section, setSection] = useState('all');
  const [data, setData] = useState<Array<Platform>>([]);

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
          <Expanded data={data} section={section} />
        )
      }
    </div>
  )
}

export default App
