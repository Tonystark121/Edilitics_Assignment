import { useEffect } from 'react'
import './App.css'
import BarGraph from './pages/chart.jsx'
import {useDispatch, useSelector} from 'react-redux'
import { fetchCovidData } from './redux/dataSlice.js';
import Navbar from './components/nav.jsx';
import LinePlot from './pages/LinePlot.jsx';

function App() {

  const dispatch = useDispatch();
  const {status, data, error, theme} = useSelector(state => state.covidData)

  console.log(status, data, error)

  useEffect(()=>{
     if(status=='idle'){
       dispatch(fetchCovidData())
     }
  },[status, dispatch])

  return (
    <>
      <div className={`app ${theme}`}>
        <Navbar />
        <BarGraph />
        <LinePlot />
      </div>
    </>
  )
}

export default App
