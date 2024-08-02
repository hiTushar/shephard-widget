import './App.css'
import Overview from './components/Overview/Overview';
import Grouped from './components/Grouped/Grouped';
import { Toolbar } from './components/Toolbar/Toolbar';
import { Route, Routes } from 'react-router-dom';
import Expanded from './components/Expanded/Expanded';

function App() {
  return (
    <div className="widget">
      <Toolbar />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/:platformId" element={<Grouped />} />
        <Route path="/:platformId/:alertId/:groupId" element={<Expanded />} />
      </Routes>
    </div>
  )
}

export default App
