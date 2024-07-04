import { useState } from 'react'
import './App.css'
import Overview from './components/Overview/Overview';
import Expanded from './components/Expanded/Expanded';
import { Toolbar } from './components/Toolbar/Toolbar.js';
import data from './data.json';

function App() {
  const [section, setSection] = useState('all');

  return (
    <div className="widget">
      <Toolbar data={data} section={section} setSection={setSection} />
      {
        section === 'all' ? (
          <div className="widget-overview">
            <Overview data={data} />
          </div>
        ) : (
          <div className="widget-expanded">
            <Expanded data={data}/>
          </div>
        )
      }
    </div>
  )
}

export default App
