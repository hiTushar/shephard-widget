import { useSelector } from 'react-redux';
import './App.css'
import Overview from './components/Overview/Overview';
import Grouped from './components/Grouped/Grouped';
import { Toolbar } from './components/Toolbar/Toolbar';
import Expanded from './components/Expanded/Expanded';
import { DataStatusReducerInterface, ViewReducerInterface } from './Types';

function App() {
  const view = useSelector((state: { viewReducer: ViewReducerInterface }) => state.viewReducer);
  const { dataStatus } = useSelector((state: { dataStatusReducer: DataStatusReducerInterface }) => state.dataStatusReducer);

  return (
    <div className={`widget ${dataStatus === 'OK' ? 'dotted-bg' : ''}`}>
      <Toolbar />
      {
        view.type === 'platform' && (
          view.platformId === 'all' ? (
            <Overview />
          ) : (
            <Grouped />
          )
        )
      }
      {
        view.type === 'alert' && (
          <Expanded />
        )
      }
    </div>
  )
}

export default App
