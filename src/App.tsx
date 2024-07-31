import { useEffect, useState } from 'react'
import './App.css'
import Overview from './components/Overview/Overview';
import Grouped from './components/Grouped/Grouped';
import { Toolbar } from './components/Toolbar/Toolbar';
import hardCodedData from './data.json';
import { Platform } from './Types';
import { Route, Routes } from 'react-router-dom';
import Expanded from './components/Expanded/Expanded';

function App() {
  const [section, setSection] = useState('');
  const [data, setData] = useState<Array<Platform>>([]);

  // TODO: replace with tan stack query
  useEffect(() => {
    setData(hardCodedData);
  }, []);

  return (
    <div className="widget">
      <Toolbar data={data} section={section} setSection={setSection} />
      <Routes>
        <Route path="/" element={<Overview data={data} setSection={setSection} />} />
        <Route path="/:platformId" element={<Grouped />} />
        <Route path="/:platformId/:alertId/:groupId" element={<Expanded />} />
      </Routes>
    </div>
  )
}

export default App
